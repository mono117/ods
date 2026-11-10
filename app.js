/**
 * ALCALDÍA 2030: MOTOR DE JUEGO Y GOBERNANZA SOSTENIBLE
 * Arquitectura modular:
 * - Estado global del mandato (Pilares, Poderes, Decisiones)
 * - Sintetizador procedural Web Audio API
 * - Motor de física gestual para tarjetas (Swipe Left / Up / Right)
 * - Controladores de eventos de interfaz y modales
 */

// Estado Global del Juego
let stats = {
    economy: 50,
    society: 50,
    environment: 50,
    budget: 50
};

let currentTurn = 0;
const totalTurns = CARDS_DECK.length; // 17 metas completas
const months = ["Ene", "Abr", "Jul", "Oct"];
let isAnimating = false;
let advisorMode = false;
let soundEnabled = true;
let decisionHistory = [];

// Poderes del Alcalde (Decretos de Emergencia)
let powers = {
    pollCount: 2,    // Consulta ciudadana: Revela los números exactos en este turno
    fundCount: 1,    // Fondo de Contingencia Verde: Suma +25% a un pilar crítico
    pactCount: 1     // Pacto Público-Privado: Hace que la siguiente decisión no consuma presupuesto
};
let isPactActive = false;
let isPollActiveForCurrentTurn = false;

// Referencias DOM
const activeCard = document.getElementById('active-card');
const swipeBadgeLeft = document.getElementById('swipe-badge-left');
const swipeBadgeRight = document.getElementById('swipe-badge-right');
const swipeBadgeUp = document.getElementById('swipe-badge-up');
const btnLeft = document.getElementById('btn-left');
const btnCenter = document.getElementById('btn-center');
const btnRight = document.getElementById('btn-right');
const gameModal = document.getElementById('game-modal');
const modalActionBtn = document.getElementById('modal-action-btn');
const modalShareBtn = document.getElementById('modal-share-btn');
const helpBtn = document.getElementById('help-btn');
const logBtn = document.getElementById('log-btn');
const logModal = document.getElementById('log-modal');
const closeLogBtn = document.getElementById('close-log-btn');
const closeLogBottomBtn = document.getElementById('close-log-bottom-btn');
const logList = document.getElementById('log-list');
const logCount = document.getElementById('log-count');
const advisorBtn = document.getElementById('advisor-btn');
const audioBtn = document.getElementById('audio-btn');
const audioIcon = document.getElementById('audio-icon');
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const newsTickerText = document.getElementById('news-ticker-text');

// Botones de Poderes
const powerPollBtn = document.getElementById('power-poll-btn');
const powerPollCount = document.getElementById('power-poll-count');
const powerFundBtn = document.getElementById('power-fund-btn');
const powerFundCount = document.getElementById('power-fund-count');
const powerPactBtn = document.getElementById('power-pact-btn');
const powerPactCount = document.getElementById('power-pact-count');

/**
 * SISTEMA DE AUDIO PROCEDURAL (WEB AUDIO API)
 */
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSound(type) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        if (type === 'swipe') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.09);
        } else if (type === 'decision') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.13);
        } else if (type === 'power') {
            // Resonancia de campana mágica de decreto
            [587.33, 880].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                const start = now + (i * 0.08);
                gain.gain.setValueAtTime(0.08, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(start);
                osc.stop(start + 0.36);
            });
        } else if (type === 'victory') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                const start = now + (i * 0.1);
                gain.gain.setValueAtTime(0.08, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(start);
                osc.stop(start + 0.52);
            });
        } else if (type === 'gameover') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(90, now + 0.4);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.42);
        }
    } catch (err) {}
}

/**
 * VIBRACIÓN HÁPTICA PARA MÓVILES
 */
function triggerHaptic(duration = 20) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
}

// Renderizar Cuadrícula de Chips de los 17 ODS en PC
function renderDesktopSdgChips() {
    const container = document.getElementById('desktop-sdg-chips');
    if (!container) return;
    container.innerHTML = CARDS_DECK.map((card, idx) => {
        const isPassed = idx < currentTurn;
        const isCurrent = idx === currentTurn;
        let bgStyle = isPassed 
            ? `background-color: ${card.sdgColor}; opacity: 0.8;` 
            : (isCurrent ? `background-color: ${card.sdgColor}; transform: scale(1.15); box-shadow: 0 0 8px ${card.sdgColor}; font-weight: 800; border: 2px solid white;` : 'background-color: #78716c; opacity: 0.35;');
        return `
            <div title="${card.sdg}" class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white font-bold transition-all" style="${bgStyle}">
                ${idx + 1}
            </div>
        `;
    }).join('');
    const counter = document.getElementById('desktop-sdg-counter');
    if (counter) counter.textContent = `${Math.min(currentTurn + 1, totalTurns)} de ${totalTurns}`;
}

// Actualizar Interfaz de Barras de Pilares
function updateStatsUI() {
    const keys = ['economy', 'society', 'environment', 'budget'];
    const statusTexts = {
        economy: { high: '• Floreciente', mid: '• Estable', low: '• En Riesgo' },
        society: { high: '• Armoniosa', mid: '• Estable', low: '• Inquieta' },
        environment: { high: '• Regenerado', mid: '• Estable', low: '• Crítico' },
        budget: { high: '• Holgado', mid: '• Estable', low: '• Al Límite' }
    };

    keys.forEach(key => {
        const val = Math.max(0, Math.min(100, stats[key]));
        const bar = document.getElementById(`bar-${key}`);
        const label = document.getElementById(`val-${key}`);
        const box = document.getElementById(`stat-box-${key}`);
        const statusEl = document.getElementById(`status-${key}`);

        bar.style.height = `${val}%`;
        label.textContent = `${val}%`;

        if (statusEl) {
            const text = val <= 25 ? statusTexts[key].low : (val >= 65 ? statusTexts[key].high : statusTexts[key].mid);
            statusEl.textContent = text;
            statusEl.className = val <= 25 ? 'text-[10px] font-bold text-rose-500 hidden lg:inline' : 'text-[10px] text-stone-400 hidden lg:inline';
        }

        // Alerta visual si un pilar está en riesgo crítico (<= 20%)
        if (val <= 20) {
            box.classList.add('danger-pulse', 'border-rose-500');
            label.classList.add('text-rose-500', 'font-black');
        } else {
            box.classList.remove('danger-pulse', 'border-rose-500');
            label.classList.remove('text-rose-500', 'font-black');
        }
    });

    // Actualizar contadores de poderes
    powerPollCount.textContent = powers.pollCount;
    powerFundCount.textContent = powers.fundCount;
    powerPactCount.textContent = powers.pactCount;
    powerPollBtn.classList.toggle('opacity-50', powers.pollCount <= 0);
    powerFundBtn.classList.toggle('opacity-50', powers.fundCount <= 0);
    powerPactBtn.classList.toggle('opacity-50', powers.pactCount <= 0);

    // Fecha calculada de 2026 a 2030
    const year = 2026 + Math.floor(currentTurn / 4);
    const month = months[currentTurn % 4] || "Ene";
    document.getElementById('date-display').textContent = currentTurn >= totalTurns ? "Dic 2030" : `${month} ${year}`;
    document.getElementById('turn-counter').textContent = `Decisión ${Math.min(currentTurn + 1, totalTurns)} / ${totalTurns}`;
    
    const progressPercent = Math.min(100, ((currentTurn) / totalTurns) * 100);
    document.getElementById('year-progress').style.width = `${Math.max(6, progressPercent)}%`;

    // Actualizar promedio general en PC
    const avgVal = document.getElementById('desktop-avg-val');
    if (avgVal) {
        const avg = Math.round((stats.economy + stats.society + stats.environment + stats.budget) / 4);
        avgVal.textContent = `${avg}%`;
    }

    renderDesktopSdgChips();
}

// Mostrar Puntos de Impacto sobre los Pilares (Con soporte de Modo Asesor y Consulta Ciudadana)
function previewImpact(direction) {
    const card = CARDS_DECK[currentTurn];
    if (!card) return;

    let effects = null;
    if (direction === 'left') effects = card.left.effects;
    else if (direction === 'center') effects = card.center.effects;
    else if (direction === 'right') effects = card.right.effects;

    const keys = ['economy', 'society', 'environment', 'budget'];

    keys.forEach(key => {
        const dot = document.getElementById(`dot-${key}`);
        dot.textContent = '';
        dot.className = 'impact-dot w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-md flex items-center justify-center text-[7px] sm:text-[8px] font-black text-white';

        if (effects && effects[key] !== 0) {
            let diff = effects[key];
            if (key === 'budget' && isPactActive && diff < 0) {
                diff = 0; // Pacto público-privado neutraliza la pérdida de presupuesto
            }

            const isPositive = diff > 0;

            if (advisorMode || isPollActiveForCurrentTurn) {
                if (isPollActiveForCurrentTurn) {
                    dot.textContent = (diff > 0 ? `+${diff}` : `${diff}`);
                    dot.style.fontSize = '6px';
                    dot.style.width = '16px';
                    dot.style.borderRadius = '6px';
                } else {
                    dot.textContent = isPositive ? '+' : '−';
                }

                if (isPositive) {
                    dot.classList.add('bg-emerald-500', 'shadow-[0_0_8px_#10b981]');
                } else if (diff === 0) {
                    dot.classList.add('bg-sky-500', 'shadow-[0_0_8px_#0ea5e9]');
                } else {
                    dot.classList.add('bg-rose-500', 'shadow-[0_0_8px_#f43f5e]');
                }
            } else {
                dot.classList.add('bg-amber-400', 'shadow-[0_0_8px_#fbbf24]');
            }

            if (Math.abs(diff) >= 20) {
                dot.classList.add('active-large');
            } else {
                dot.classList.add('active-small');
            }
        }
    });
}

// Renderizar la Tarjeta Actual en el Mazo con sus 3 Opciones
function renderCurrentCard() {
    const card = CARDS_DECK[currentTurn];
    if (!card) return;

    const badge = document.getElementById('sdg-badge');
    badge.style.backgroundColor = card.sdgColor;
    badge.style.color = card.textColor;
    badge.innerHTML = `<i class="fa-solid ${card.icon}"></i><span class="truncate max-w-[200px] sm:max-w-xs">${card.sdg}</span>`;

    document.getElementById('card-index-indicator').textContent = `${currentTurn + 1} / ${totalTurns}`;
    document.getElementById('char-emoji').textContent = card.emoji;
    document.getElementById('char-name').textContent = card.character;
    document.getElementById('char-role').textContent = card.role;
    document.getElementById('card-dilemma').textContent = card.dilemma;

    // Textos de los 3 botones
    document.getElementById('btn-left-text').textContent = card.left.text;
    document.getElementById('btn-center-text').textContent = card.center.text;
    document.getElementById('btn-right-text').textContent = card.right.text;

    swipeBadgeLeft.textContent = card.left.text;
    swipeBadgeRight.textContent = card.right.text;
    swipeBadgeUp.textContent = `✨ ${card.center.text}`;

    // Resetear estado de poderes para el nuevo turno
    isPollActiveForCurrentTurn = false;

    // Actualizar Panel Derecho en PC
    const desktopTitle = document.getElementById('desktop-sdg-title');
    if (desktopTitle) {
        desktopTitle.textContent = card.sdg;
        document.getElementById('desktop-sdg-fact').textContent = card.fact;
        const iconBox = document.getElementById('desktop-sdg-icon-box');
        iconBox.style.backgroundColor = card.sdgColor;
        document.getElementById('desktop-sdg-icon').className = `fa-solid ${card.icon}`;
    }

    // Restablecer estilos de la tarjeta activa
    activeCard.className = 'decision-card w-full min-h-[340px] sm:min-h-[370px] lg:min-h-[395px] bg-white dark:bg-stone-900 border-2 border-stone-200/90 dark:border-stone-700/80 rounded-[2.5rem] p-4 sm:p-5 flex flex-col justify-between shadow-xl shadow-stone-900/10 relative overflow-hidden cursor-grab transition-colors';
    activeCard.style.transform = '';
    swipeBadgeLeft.style.opacity = '0';
    swipeBadgeRight.style.opacity = '0';
    swipeBadgeUp.style.opacity = '0';
    previewImpact(null);
}

// Registrar Decisión en la Bitácora
function logDecision(card, direction, choice) {
    const year = 2026 + Math.floor(currentTurn / 4);
    const month = months[currentTurn % 4] || "Ene";
    const dirLabel = direction === 'left' ? 'Opción A' : (direction === 'center' ? '3ª Vía (Opción C)' : 'Opción B');
    
    decisionHistory.push({
        turn: currentTurn + 1,
        date: `${month} ${year}`,
        sdg: card.sdg,
        sdgColor: card.sdgColor,
        icon: card.icon,
        character: card.character,
        choiceTitle: choice.text,
        direction: dirLabel,
        effects: { ...choice.effects },
        reaction: choice.reaction,
        fact: card.fact
    });
    updateLogModalContent();
    updateDesktopRecentList();
}

// Actualizar Lista Reciente en el Panel Lateral de PC
function updateDesktopRecentList() {
    const recentList = document.getElementById('desktop-recent-list');
    if (!recentList) return;

    const recent = decisionHistory.slice(-3).reverse();
    if (recent.length === 0) {
        recentList.innerHTML = `
            <div class="py-3 text-center text-stone-400 text-xs">
                <i class="fa-regular fa-folder-open text-xl mb-1 block"></i>
                Esperando primer decreto...
            </div>`;
        return;
    }

    recentList.innerHTML = recent.map(entry => `
        <div class="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 flex flex-col gap-0.5 transition-all">
            <div class="flex items-center justify-between text-[10px]">
                <span class="font-bold truncate max-w-[150px] text-stone-500">${entry.date} • ${entry.direction}</span>
                <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${entry.sdgColor};" title="${entry.sdg}"></span>
            </div>
            <span class="font-bold text-stone-800 dark:text-stone-100 truncate">${entry.choiceTitle}</span>
            <span class="text-[9px] italic text-stone-500 truncate">"${entry.reaction}"</span>
        </div>
    `).join('');
}

// Actualizar Contenido del Modal de Bitácora
function updateLogModalContent() {
    logCount.textContent = `${decisionHistory.length} decisiones registradas`;
    if (decisionHistory.length === 0) {
        logList.innerHTML = `
            <div class="py-8 text-center text-stone-400">
                <i class="fa-solid fa-scroll text-3xl mb-2"></i>
                <p>Aún no se han firmado decretos en este mandato.</p>
            </div>`;
        return;
    }

    logList.innerHTML = decisionHistory.map(entry => `
        <div class="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex flex-col gap-1.5 transition-all">
            <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-xs" style="background-color: ${entry.sdgColor}">
                    <i class="fa-solid ${entry.icon}"></i>
                    <span class="truncate max-w-[200px]">${entry.sdg}</span>
                </span>
                <span class="text-[10px] font-bold text-stone-400">${entry.date} (${entry.direction})</span>
            </div>
            <div class="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <i class="fa-solid fa-check text-emerald-600 text-xs"></i>
                <span>${entry.choiceTitle}</span>
            </div>
            <p class="text-[10px] italic text-stone-500 bg-stone-100 dark:bg-stone-900/60 p-1.5 rounded-lg">
                📰 "${entry.reaction}"
            </p>
            <div class="flex flex-wrap gap-2 text-[10px] font-bold mt-0.5">
                <span class="${entry.effects.economy >= 0 ? 'text-amber-700 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}">
                    Econ: ${entry.effects.economy > 0 ? '+' : ''}${entry.effects.economy}%
                </span>
                <span class="${entry.effects.society >= 0 ? 'text-rose-700 dark:text-rose-400' : 'text-rose-600 dark:text-rose-400'}">
                    Soc: ${entry.effects.society > 0 ? '+' : ''}${entry.effects.society}%
                </span>
                <span class="${entry.effects.environment >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
                    Amb: ${entry.effects.environment > 0 ? '+' : ''}${entry.effects.environment}%
                </span>
                <span class="${entry.effects.budget >= 0 ? 'text-sky-700 dark:text-sky-400' : 'text-rose-600 dark:text-rose-400'}">
                    Pres: ${entry.effects.budget > 0 ? '+' : ''}${entry.effects.budget}%
                </span>
            </div>
        </div>
    `).join('');
}

// Ejecutar Decisión del Jugador (Izquierda, Centro o Derecha)
function makeDecision(direction) {
    if (isAnimating || currentTurn >= totalTurns) return;
    isAnimating = true;

    playSound('decision');
    triggerHaptic(30);

    const card = CARDS_DECK[currentTurn];
    let choice = card.left;
    let swipeClass = 'swipe-left';

    if (direction === 'center') {
        choice = card.center;
        swipeClass = 'swipe-up';
    } else if (direction === 'right') {
        choice = card.right;
        swipeClass = 'swipe-right';
    }

    // Registrar en historial
    logDecision(card, direction, choice);

    // Actualizar titular en vivo en "La Voz de la Calle"
    newsTickerText.textContent = `"${choice.reaction}"`;

    // Animación de salida física
    activeCard.classList.add(swipeClass);
    previewImpact(null);

    // Calcular efectos con el modificador de pacto si estaba activo
    let budgetDiff = choice.effects.budget;
    if (isPactActive && budgetDiff < 0) {
        budgetDiff = 0;
        isPactActive = false; // El pacto se consume
    }

    // Actualizar estadísticas con límites de 0 a 100
    stats.economy = Math.max(0, Math.min(100, stats.economy + choice.effects.economy));
    stats.society = Math.max(0, Math.min(100, stats.society + choice.effects.society));
    stats.environment = Math.max(0, Math.min(100, stats.environment + choice.effects.environment));
    stats.budget = Math.max(0, Math.min(100, stats.budget + budgetDiff));

    setTimeout(() => {
        const failedPillar = checkGameOver();
        if (failedPillar) {
            updateStatsUI();
            playSound('gameover');
            showEndModal(false, failedPillar, card.fact);
            isAnimating = false;
            return;
        }

        currentTurn++;
        updateStatsUI();

        // Victoria: Se completaron los 17 ODS alcanzando el año 2030
        if (currentTurn >= totalTurns) {
            playSound('victory');
            showEndModal(true, null, card.fact);
            isAnimating = false;
            return;
        }

        renderCurrentCard();
        isAnimating = false;
    }, 320);
}

// Evaluar si algún pilar colapsó a cero
function checkGameOver() {
    if (stats.economy <= 0) return {
        title: "¡Colapso Económico!",
        emoji: "📉",
        desc: "La economía de la ciudad tocó el 0%. El cierre masivo de pequeñas empresas provocó un paro general antes del año 2030."
    };
    if (stats.society <= 0) return {
        title: "¡Crisis y Protesta Social!",
        emoji: "🪧",
        desc: "El bienestar social cayó a 0%. La falta de equidad y servicios esenciales obligó a disolver el concejo municipal."
    };
    if (stats.environment <= 0) return {
        title: "¡Colapso Ecológico!",
        emoji: "☣️",
        desc: "El indicador ambiental llegó a 0%. Los niveles de polución en agua y aire declararon a la ciudad en emergencia sanitaria irrevocable."
    };
    if (stats.budget <= 0) return {
        title: "¡Bancarrota Municipal!",
        emoji: "🏦",
        desc: "Las arcas municipales llegaron a 0%. Sin liquidez para salarios públicos ni recolección de residuos, la alcaldía fue intervenida."
    };
    return null;
}

// Determinar Arquetipo del Alcalde según sus estadísticas finales
function calculateMayorArchetype() {
    const { economy, society, environment, budget } = stats;
    if (environment >= 65 && society >= 60) return "Líder de la Transición Ecosocial";
    if (environment >= 70) return "Alcalde Guardián de la Naturaleza";
    if (economy >= 70 && budget >= 60) return "Estratega de la Prosperidad Circular";
    if (society >= 70) return "Defensor de la Equidad Ciudadana";
    return "Alcalde del Equilibrio Sostenible";
}

// Mostrar Modal de Fin de Juego (Victoria o Derrota)
function showEndModal(isVictory, failureData, lastFact) {
    const emojiEl = document.getElementById('modal-emoji');
    const badgeEl = document.getElementById('modal-badge');
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-desc');
    const factTitleEl = document.getElementById('modal-fact-title');
    const factTextEl = document.getElementById('modal-fact-text');

    if (isVictory) {
        const avg = Math.round((stats.economy + stats.society + stats.environment + stats.budget) / 4);
        const archetype = calculateMayorArchetype();

        emojiEl.textContent = "🏆";
        badgeEl.textContent = "¡Meta 2030 Cumplida!";
        badgeEl.className = "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 mb-2";
        titleEl.textContent = "¡Ciudad Sostenible 2030!";
        descEl.textContent = `¡Excelente gestión! Condujiste la ciudad con éxito hasta 2030 con un Índice de Sostenibilidad Global del ${avg}%. Tu perfil oficial es: "${archetype}".`;
        factTitleEl.textContent = "Balance General de Mandato";
        factTextEl.innerHTML = `
            <div class="space-y-1">
                <div>🌾 <strong>Economía:</strong> ${stats.economy}%</div>
                <div>👥 <strong>Sociedad:</strong> ${stats.society}%</div>
                <div>🌿 <strong>Ambiente:</strong> ${stats.environment}%</div>
                <div>🪙 <strong>Presupuesto:</strong> ${stats.budget}%</div>
            </div>`;
        modalActionBtn.textContent = "Comenzar Nuevo Mandato";

        modalShareBtn.classList.remove('hidden');
        modalShareBtn.onclick = () => {
            const text = `🌱 ¡Logré conducir mi ciudad hasta 2030 en el Simulador ODS (3 Vías)!\n🏆 Índice de Sostenibilidad: ${avg}%\n🏛️ Título: ${archetype}\nEcon: ${stats.economy}% | Soc: ${stats.society}% | Amb: ${stats.environment}% | Pres: ${stats.budget}%\n#ODS2030 #Alcaldia2030`;
            navigator.clipboard.writeText(text).then(() => {
                modalShareBtn.innerHTML = '<i class="fa-solid fa-check mr-1.5 text-emerald-600"></i> ¡Copiado al portapapeles!';
                setTimeout(() => {
                    modalShareBtn.innerHTML = '<i class="fa-regular fa-copy mr-1.5"></i> Copiar Resumen de Mandato';
                }, 2500);
            });
        };
    } else {
        emojiEl.textContent = failureData.emoji;
        badgeEl.textContent = "Fin del Mandato";
        badgeEl.className = "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 mb-2";
        titleEl.textContent = failureData.title;
        descEl.textContent = failureData.desc;
        factTitleEl.textContent = "Lección ODS de la última decisión";
        factTextEl.textContent = lastFact;
        modalActionBtn.textContent = "Volver a Intentar";
        modalShareBtn.classList.add('hidden');
    }

    modalActionBtn.onclick = restartGame;
    gameModal.classList.remove('hidden');
}

// Reiniciar Partida
function restartGame() {
    stats = { economy: 50, society: 50, environment: 50, budget: 50 };
    powers = { pollCount: 2, fundCount: 1, pactCount: 1 };
    isPactActive = false;
    isPollActiveForCurrentTurn = false;
    currentTurn = 0;
    decisionHistory = [];
    newsTickerText.textContent = '"Inicia un nuevo mandato: Ciudadanos atentos a las primeras medidas."';
    updateLogModalContent();
    updateDesktopRecentList();
    gameModal.classList.add('hidden');
    updateStatsUI();
    renderCurrentCard();
}

// Activación de Poderes del Alcalde
powerPollBtn.addEventListener('click', () => {
    if (powers.pollCount <= 0) return;
    powers.pollCount--;
    isPollActiveForCurrentTurn = true;
    playSound('power');
    triggerHaptic(40);
    updateStatsUI();
    newsTickerText.textContent = '🗳️ Consulta Ciudadana activa: Se han revelado los porcentajes numéricos exactos de las 3 alternativas.';
});

powerFundBtn.addEventListener('click', () => {
    if (powers.fundCount <= 0) return;
    const keys = ['economy', 'society', 'environment', 'budget'];
    let lowestKey = keys[0];
    keys.forEach(k => {
        if (stats[k] < stats[lowestKey]) lowestKey = k;
    });

    powers.fundCount--;
    stats[lowestKey] = Math.min(100, stats[lowestKey] + 25);
    playSound('power');
    triggerHaptic(50);
    updateStatsUI();
    newsTickerText.textContent = `💰 Fondo Verde inyectó recursos de emergencia: +25% aplicado al pilar más crítico.`;
});

powerPactBtn.addEventListener('click', () => {
    if (powers.pactCount <= 0) return;
    powers.pactCount--;
    isPactActive = true;
    playSound('power');
    triggerHaptic(40);
    updateStatsUI();
    newsTickerText.textContent = '🤝 Pacto Público-Privado firmado: Tu próxima decisión no tendrá costos presupuestarios.';
});

// Eventos para Botones de Decisión (Izquierda, Centro, Derecha)
btnLeft.addEventListener('mouseenter', () => previewImpact('left'));
btnLeft.addEventListener('mouseleave', () => previewImpact(null));
btnLeft.addEventListener('click', () => makeDecision('left'));

btnCenter.addEventListener('mouseenter', () => previewImpact('center'));
btnCenter.addEventListener('mouseleave', () => previewImpact(null));
btnCenter.addEventListener('click', () => makeDecision('center'));

btnRight.addEventListener('mouseenter', () => previewImpact('right'));
btnRight.addEventListener('mouseleave', () => previewImpact(null));
btnRight.addEventListener('click', () => makeDecision('right'));

// Atajos de Teclado Universales (Flechas, A/W/D, Espacio, Escape)
window.addEventListener('keydown', (e) => {
    if (!gameModal.classList.contains('hidden') || !logModal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            gameModal.classList.add('hidden');
            logModal.classList.add('hidden');
        }
        return;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') makeDecision('left');
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') makeDecision('center');
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') makeDecision('right');
});

// Interacción Física de Arrastre / Swipe en la Tarjeta (Izquierda, Arriba, Derecha)
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let isDragging = false;

function onDragStart(clientX, clientY) {
    if (isAnimating) return;
    isDragging = true;
    startX = clientX;
    startY = clientY;
    activeCard.classList.add('dragging');
}

function onDragMove(clientX, clientY) {
    if (!isDragging) return;
    currentX = clientX - startX;
    currentY = clientY - startY;

    // Determinar si el gesto es predominantemente vertical (hacia arriba) u horizontal
    const isUpward = currentY < -35 && Math.abs(currentY) > Math.abs(currentX) * 1.1;

    if (isUpward) {
        // Arrastre hacia arriba (Opción C / Tercera Vía)
        activeCard.style.transform = `translateX(${currentX * 0.3}px) translateY(${currentY}px) scale(0.97)`;
        const opacity = Math.min(1, Math.abs(currentY) / 75);
        swipeBadgeUp.style.opacity = opacity;
        swipeBadgeLeft.style.opacity = 0;
        swipeBadgeRight.style.opacity = 0;
        previewImpact('center');
        if (Math.abs(currentY) > 80) triggerHaptic(10);
    } else {
        // Arrastre horizontal estándar
        const rotate = currentX * 0.055;
        activeCard.style.transform = `translateX(${currentX}px) translateY(${currentY * 0.2}px) rotate(${rotate}deg)`;

        const opacity = Math.min(1, Math.abs(currentX) / 85);
        swipeBadgeUp.style.opacity = 0;

        if (currentX < -25) {
            swipeBadgeLeft.style.opacity = opacity;
            swipeBadgeRight.style.opacity = 0;
            previewImpact('left');
            if (Math.abs(currentX) > 90) triggerHaptic(10);
        } else if (currentX > 25) {
            swipeBadgeRight.style.opacity = opacity;
            swipeBadgeLeft.style.opacity = 0;
            previewImpact('right');
            if (Math.abs(currentX) > 90) triggerHaptic(10);
        } else {
            swipeBadgeLeft.style.opacity = 0;
            swipeBadgeRight.style.opacity = 0;
            previewImpact(null);
        }
    }
}

function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    activeCard.classList.remove('dragging');

    const isUpward = currentY < -75 && Math.abs(currentY) > Math.abs(currentX);

    if (isUpward) {
        makeDecision('center');
    } else if (currentX < -95) {
        makeDecision('left');
    } else if (currentX > 95) {
        makeDecision('right');
    } else {
        activeCard.style.transform = '';
        swipeBadgeLeft.style.opacity = 0;
        swipeBadgeRight.style.opacity = 0;
        swipeBadgeUp.style.opacity = 0;
        previewImpact(null);
    }
    currentX = 0;
    currentY = 0;
}

// Listeners Ratón
activeCard.addEventListener('mousedown', (e) => onDragStart(e.clientX, e.clientY));
window.addEventListener('mousemove', (e) => onDragMove(e.clientX, e.clientY));
window.addEventListener('mouseup', onDragEnd);

// Listeners Pantallas Táctiles Móviles
activeCard.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
window.addEventListener('touchmove', (e) => {
    if (isDragging) onDragMove(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });
window.addEventListener('touchend', onDragEnd);

// Toggle Modo Asesor
advisorBtn.addEventListener('click', () => {
    advisorMode = !advisorMode;
    advisorBtn.classList.toggle('bg-amber-100', advisorMode);
    advisorBtn.classList.toggle('dark:bg-amber-950', advisorMode);
    advisorBtn.classList.toggle('border-amber-400', advisorMode);
    previewImpact(null);
    playSound('swipe');
});

// Toggle Audio
audioBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    audioIcon.className = soundEnabled 
        ? 'fa-solid fa-volume-high text-xs sm:text-sm text-stone-600 dark:text-stone-300' 
        : 'fa-solid fa-volume-xmark text-xs sm:text-sm text-stone-400';
    if (soundEnabled) playSound('decision');
});

// Toggle Tema (Luz Natural / Bosque Profundo)
themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeIcon.className = isDark ? 'fa-solid fa-sun text-xs sm:text-sm text-amber-400' : 'fa-solid fa-moon text-xs sm:text-sm';
    playSound('swipe');
});

// Apertura y Cierre de la Bitácora
logBtn.addEventListener('click', () => {
    updateLogModalContent();
    logModal.classList.remove('hidden');
    playSound('swipe');
});
closeLogBtn.addEventListener('click', () => logModal.classList.add('hidden'));
closeLogBottomBtn.addEventListener('click', () => logModal.classList.add('hidden'));

// Botón de Ayuda e Instrucciones
helpBtn.addEventListener('click', () => {
    document.getElementById('modal-emoji').textContent = "🏛️";
    document.getElementById('modal-badge').textContent = "Guía del Mandato Sostenible";
    document.getElementById('modal-badge').className = "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 mb-2";
    document.getElementById('modal-title').textContent = "¿Cómo gobernar con 3 Vías?";
    document.getElementById('modal-desc').textContent = "Desliza la tarjeta hacia la izquierda (Opción A), derecha (Opción B) o hacia ARRIBA (Tercera Vía / Opción C). También puedes usar los 3 botones inferiores o las teclas A, W, D.";
    document.getElementById('modal-fact-title').textContent = "Poderes y Equilibrio ODS";
    document.getElementById('modal-fact-text').innerHTML = "Dispones de <strong>Consulta Ciudadana, Fondo Verde y Pacto Mixto</strong> para gestionar momentos difíciles. ¡Mantén los 4 pilares por encima de 0% hasta el 2030!";
    modalActionBtn.textContent = "Continuar Mandato";
    modalShareBtn.classList.add('hidden');
    modalActionBtn.onclick = () => gameModal.classList.add('hidden');
    gameModal.classList.remove('hidden');
    playSound('swipe');
});

// Inicializar Estado al Cargar la Página
window.onload = () => {
    updateStatsUI();
    renderCurrentCard();
    updateLogModalContent();
    updateDesktopRecentList();
};
