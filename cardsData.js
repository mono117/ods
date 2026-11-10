/**
 * BASE DE DATOS DE DILEMAS ODS CON SISTEMA DE 3 OPCIONES:
 * - left: Opción A (Austeridad / Tradicional / Inmediato)
 * - center: Opción C (Tercera Vía / Innovación Circular / Alianza Comunitaria)
 * - right: Opción B (Transformación Verde Pura / Inversión Pública Alta)
 * Incluye reacciones de prensa y ciudadanía para "La Voz de la Calle".
 */
const CARDS_DECK = [
    {
        sdg: "ODS 7: Energía Asequible y No Contaminante",
        sdgNumber: 7,
        sdgColor: "#fcc30b",
        textColor: "#0f172a",
        icon: "fa-solar-panel",
        emoji: "⚡",
        character: "Ministra de Energía",
        role: "Red Eléctrica Municipal",
        dilemma: "\"Alcalde, la ciudad necesita más electricidad urgente. ¿Expandimos el carbón, construimos una planta solar municipal o apoyamos cooperativas solares en techos vecinales?\"",
        left: {
            text: "Expandir red de carbón",
            effects: { economy: +10, society: -10, environment: -25, budget: +15 },
            reaction: "Vecinos de la periferia tosen: 'El aire se volvió irrespirable tras reactivar la carbonífera'."
        },
        center: {
            text: "Cooperativas solares barriales",
            effects: { economy: +15, society: +20, environment: +15, budget: -5 },
            reaction: "El Faro: 'Familias reducen su factura de luz un 40% instalando paneles comunitarios'."
        },
        right: {
            text: "Planta solar 100% municipal",
            effects: { economy: +10, society: +15, environment: +25, budget: -20 },
            reaction: "Eco Diario: 'Inauguran mega-parque solar público: la ciudad avanza a la descarbonización'."
        },
        fact: "El ODS 7 promueve la transición a energías renovables, reduciendo la huella de carbono y asegurando aire limpio para la ciudadanía."
    },
    {
        sdg: "ODS 1: Fin de la Pobreza",
        sdgNumber: 1,
        sdgColor: "#e5243b",
        textColor: "#ffffff",
        icon: "fa-hand-holding-dollar",
        emoji: "🌱",
        character: "Comité Barrial Comunitario",
        role: "Inclusión y Desarrollo Social",
        dilemma: "\"Familias vulnerables sufren por el costo de vida. ¿Aplicamos austeridad fiscal, creamos subsidios verdes o abrimos un banco popular de herramientas y autoempleo?\"",
        left: {
            text: "Priorizar austeridad fiscal",
            effects: { economy: -10, society: -25, environment: 0, budget: +20 },
            reaction: "Protestas en la plaza: 'La falta de asistencia hunde a cientos de hogares bajo la línea de pobreza'."
        },
        center: {
            text: "Banco de microcréditos y oficios",
            effects: { economy: +20, society: +20, environment: +10, budget: -10 },
            reaction: "Voz Barrial: 'Más de 300 vecinos crearon emprendimientos circulares gracias al banco popular'."
        },
        right: {
            text: "Renta de transición ecológica",
            effects: { economy: +15, society: +25, environment: +10, budget: -20 },
            reaction: "Informe Social: 'Se reduce drásticamente la indigencia urbana gracias al apoyo de emergencia'."
        },
        fact: "El ODS 1 busca erradicar la pobreza mediante la protección social universal y el fortalecimiento de la resiliencia económica comunitaria."
    },
    {
        sdg: "ODS 6: Agua Limpia y Saneamiento",
        sdgNumber: 6,
        sdgColor: "#26bde2",
        textColor: "#0f172a",
        icon: "fa-droplet",
        emoji: "🚰",
        character: "Directora Hidráulica",
        role: "Gestión de Cuencas y Ríos",
        dilemma: "\"Fábricas vierten químicos al río. ¿Aplicamos una multa menor, construimos una planta de tratamiento con deuda o instalamos bio-humedales y captación pluvial?\"",
        left: {
            text: "Solo aplicar multa menor",
            effects: { economy: +10, society: -20, environment: -25, budget: +15 },
            reaction: "Alerta sanitaria: 'Peces muertos flotan en la orilla del río principal'."
        },
        center: {
            text: "Bio-humedales y captación de lluvia",
            effects: { economy: +10, society: +15, environment: +20, budget: -10 },
            reaction: "Naturaleza Viva: 'Los nuevos humedales filtran el agua naturalmente a un tercio del costo'."
        },
        right: {
            text: "Planta de tratamiento industrial",
            effects: { economy: -5, society: +20, environment: +25, budget: -20 },
            reaction: "Boletín Oficial: 'Entra en operación la planta de tratamiento más moderna de la provincia'."
        },
        fact: "El ODS 6 protege las cuencas hídricas naturales y garantiza que toda la población acceda a agua potable segura y saneamiento digno."
    },
    {
        sdg: "ODS 11: Ciudades y Comunidades Sostenibles",
        sdgNumber: 11,
        sdgColor: "#fd9d24",
        textColor: "#0f172a",
        icon: "fa-bicycle",
        emoji: "🚲",
        character: "Planificador Urbano",
        role: "Movilidad y Espacio Público",
        dilemma: "\"El tráfico céntrico colapsa las avenidas. ¿Ensanchamos vías para autos, peatonalizamos con ciclovías o subsidiamos un tranvía eléctrico público?\"",
        left: {
            text: "Ensanchar vías para autos",
            effects: { economy: +15, society: -10, environment: -20, budget: -15 },
            reaction: "Automovilistas atrapados: 'El tráfico inducido colapsó las nuevas avenidas en pocas semanas'."
        },
        center: {
            text: "Corredor de ciclovías y arbolado",
            effects: { economy: +10, society: +20, environment: +15, budget: -10 },
            reaction: "Comerciantes céntricos: 'La peatonalización aumentó las ventas un 25% y florecen los cafés'."
        },
        right: {
            text: "Tranvía eléctrico metropolitano",
            effects: { economy: +5, society: +20, environment: +20, budget: -20 },
            reaction: "Crónica Urbana: 'Viajar en tranvía reduce 45 minutos diarios de viaje a los trabajadores'."
        },
        fact: "El ODS 11 busca urbes amigables, seguras y descarbonizadas con transporte público masivo no contaminante."
    },
    {
        sdg: "ODS 8: Trabajo Decente y Crecimiento Económico",
        sdgNumber: 8,
        sdgColor: "#a21942",
        textColor: "#ffffff",
        icon: "fa-briefcase",
        emoji: "🏗️",
        character: "Cámara de Comercio Sostenible",
        role: "Desarrollo Económico Local",
        dilemma: "\"Un consorcio empresarial busca instalarse en la ciudad. ¿Damos exención total de impuestos, exigimos cuotas de empleo verde o creamos una incubadora de pymes ecológicas?\"",
        left: {
            text: "Exención fiscal total sin condiciones",
            effects: { economy: +20, society: -10, environment: -5, budget: -15 },
            reaction: "Sindicatos alertan: 'Empleos precarios y contratos temporales sin estabilidad laboral'."
        },
        center: {
            text: "Incubadora municipal de bio-pymes",
            effects: { economy: +20, society: +15, environment: +15, budget: -10 },
            reaction: "Revista Innovar: 'Nacen 50 cooperativas tecnológicas con arraigo local y salarios justos'."
        },
        right: {
            text: "Exigir empleo verde y salarios justos",
            effects: { economy: +15, society: +20, environment: +10, budget: +5 },
            reaction: "La Empresa firma acuerdo: 'Se contratan 400 técnicos con certificación ambiental oficial'."
        },
        fact: "El ODS 8 une el crecimiento productivo con condiciones laborales dignas, erradicando la precarización y promoviendo la economía circular."
    },
    {
        sdg: "ODS 2: Hambre Cero",
        sdgNumber: 2,
        sdgColor: "#dda63a",
        textColor: "#0f172a",
        icon: "fa-wheat-awn",
        emoji: "🌾",
        character: "Cooperativa Agraria Familiar",
        role: "Soberanía Alimentaria",
        dilemma: "\"La sequía encareció las verduras. ¿Importamos alimentos ultraprocesados baratos, abrimos comedores con subsidio o creamos una red de huertos agroecológicos?\"",
        left: {
            text: "Importar ultraprocesados baratos",
            effects: { economy: -10, society: -20, environment: -10, budget: +15 },
            reaction: "Médicos alertan: 'Se disparan casos de malnutrición y diabetes infantil en escuelas'."
        },
        center: {
            text: "Red de huertos agroecológicos",
            effects: { economy: +15, society: +20, environment: +15, budget: -10 },
            reaction: "Feria Frutihortícola: 'Las escuelas cosechan sus propios tomates y lechugas sin agrotóxicos'."
        },
        right: {
            text: "Comedores con menú fresco subsidiado",
            effects: { economy: +15, society: +25, environment: +10, budget: -20 },
            reaction: "Familias agradecidas: 'Tres mil platos calientes diarios aseguran la nutrición de los niños'."
        },
        fact: "El ODS 2 asegura alimentación nutritiva mediante la agricultura sostenible, circuitos cortos de distribución y comercio justo."
    },
    {
        sdg: "ODS 12: Producción y Consumo Responsables",
        sdgNumber: 12,
        sdgColor: "#bf8b2e",
        textColor: "#ffffff",
        icon: "fa-recycle",
        emoji: "♻️",
        character: "Jefa de Economía Circular",
        role: "Gestión de Residuos",
        dilemma: "\"El vertedero municipal colapsa. ¿Abrimos otro basurero barato afuera, construimos una planta de reciclaje o premiamos a comercios con cero desperdicios?\"",
        left: {
            text: "Abrir basurero en la periferia",
            effects: { economy: -5, society: -15, environment: -25, budget: +10 },
            reaction: "Vecinos de la periferia cortan rutas: 'No aceptaremos ser el patio trasero de la basura'."
        },
        center: {
            text: "Descuento tributario por basura cero",
            effects: { economy: +15, society: +15, environment: +20, budget: -5 },
            reaction: "Comercios verdes: 'El 70% de los restaurantes separa residuos orgánicos para compost'."
        },
        right: {
            text: "Centro municipal de reciclaje y biogás",
            effects: { economy: +20, society: +10, environment: +25, budget: -15 },
            reaction: "Industria limpia: 'El vertedero genera electricidad renovable a partir del biogás orgánico'."
        },
        fact: "El ODS 12 fomenta la reducción radical de desechos mediante prevención, reducción, reciclaje y reutilización de recursos."
    },
    {
        sdg: "ODS 4: Educación de Calidad",
        sdgNumber: 4,
        sdgColor: "#c5192d",
        textColor: "#ffffff",
        icon: "fa-graduation-cap",
        emoji: "🎓",
        character: "Red de Escuelas Públicas",
        role: "Consejo Educativo",
        dilemma: "\"Las escuelas rurales no tienen conectividad ni ciencias. ¿Postergamos el gasto, compramos tablets importadas o creamos aulas maker con reciclaje tecnológico?\"",
        left: {
            text: "Postergar inversión para ahorrar",
            effects: { economy: -15, society: -25, environment: 0, budget: +20 },
            reaction: "Fuga escolar: 'Alumnos abandonan las aulas rurales por falta de oportunidades de futuro'."
        },
        center: {
            text: "Aulas maker y reciclaje de PC",
            effects: { economy: +20, society: +20, environment: +15, budget: -8 },
            reaction: "Feria de Ciencias: 'Estudiantes reparan computadoras en desuso y crean sensores de riego'."
        },
        right: {
            text: "Laboratorios de ciencia e internet satelital",
            effects: { economy: +20, society: +25, environment: +5, budget: -15 },
            reaction: "Docentes emocionados: 'Por primera vez todos los colegios del municipio tienen internet de alta velocidad'."
        },
        fact: "El ODS 4 garantiza educación inclusiva, equitativa y de calidad como motor esencial para superar las brechas estructurales."
    },
    {
        sdg: "ODS 13: Acción por el Clima",
        sdgNumber: 13,
        sdgColor: "#3f7e44",
        textColor: "#ffffff",
        icon: "fa-cloud-sun-rain",
        emoji: "🌡️",
        character: "Comité de Resiliencia Climática",
        role: "Defensa Civil",
        dilemma: "\"Se pronostican olas de calor extremas. ¿Vendemos terrenos para edificios con aire acondicionado, plantamos bosques urbanos o techamos plazas con sombreadores solares?\"",
        left: {
            text: "Vender terrenos a constructoras",
            effects: { economy: +15, society: -20, environment: -25, budget: +25 },
            reaction: "Golpes de calor récord: 'Hospitales colapsan por descompensaciones térmicas en el asfalto'."
        },
        center: {
            text: "Sombreadores solares y bebederos",
            effects: { economy: +10, society: +15, environment: +15, budget: -8 },
            reaction: "Plazas vivas: 'Refugios climáticos comunitarios bajan 5 grados la temperatura barrial'."
        },
        right: {
            text: "Crear cinturón de bosques urbanos",
            effects: { economy: +5, society: +20, environment: +25, budget: -15 },
            reaction: "Reporte meteorológico: 'Cinco mil árboles nativos enfrían el aire de la ciudad'."
        },
        fact: "El ODS 13 urge adoptar medidas inmediatas contra el cambio climático, incrementando la cobertura arbórea y la resiliencia térmica."
    },
    {
        sdg: "ODS 3: Salud y Bienestar",
        sdgNumber: 3,
        sdgColor: "#4c9f38",
        textColor: "#ffffff",
        icon: "fa-heart-pulse",
        emoji: "🏥",
        character: "Consejo de Salud Integral",
        role: "Atención Primaria",
        dilemma: "\"Crecen las alergias respiratorias y el estrés laboral. ¿Cobramos copagos altos, abrimos un mega-hospital o fortalecemos promotores de salud barrial y deporte?\"",
        left: {
            text: "Cobrar copagos médicos altos",
            effects: { economy: -10, society: -25, environment: 0, budget: +20 },
            reaction: "Carteles en policlínicos: 'Vecinos de bajos recursos descontinúan sus tratamientos crónicos'."
        },
        center: {
            text: "Promotores comunitarios y vida activa",
            effects: { economy: +10, society: +20, environment: +10, budget: -8 },
            reaction: "Salud pública: 'Cae un 35% la internación de emergencia gracias a chequeos preventivos barriales'."
        },
        right: {
            text: "Centros barriales de salud preventiva",
            effects: { economy: +10, society: +25, environment: 0, budget: -20 },
            reaction: "Jornada histórica: 'Inauguran diez clínicas de proximidad con atención médica y psicológica gratuita'."
        },
        fact: "El ODS 3 busca garantizar vida sana y promover el bienestar para todas las edades a través de servicios preventivos accesibles."
    },
    {
        sdg: "ODS 9: Industria, Innovación e Infraestructura",
        sdgNumber: 9,
        sdgColor: "#fd6925",
        textColor: "#0f172a",
        icon: "fa-microchip",
        emoji: "🔬",
        character: "Polo de Innovación Bio-tecnológica",
        role: "Universidad Tecnológica",
        dilemma: "\"Científicos locales inventaron un biofiltro que convierte humo de fábricas en biofertilizante. ¿Archivamos el proyecto, cofinanciamos la patente pública o creamos consorcio mixto?\"",
        left: {
            text: "Archivar por prudencia fiscal",
            effects: { economy: -10, society: -10, environment: -10, budget: +5 },
            reaction: "Fuga de cerebros: 'Investigadores premiados venden su invento al extranjero por falta de apoyo'."
        },
        center: {
            text: "Consorcio público-universitario local",
            effects: { economy: +20, society: +15, environment: +15, budget: -8 },
            reaction: "Patente abierta: 'Fábricas locales adoptan el biofiltro y reducen sus humos a mitad de precio'."
        },
        right: {
            text: "Cofinanciar patente municipal exclusiva",
            effects: { economy: +25, society: +10, environment: +20, budget: -15 },
            reaction: "Inversión global: 'La ciudad exporta tecnología verde y multiplica sus ingresos futuros'."
        },
        fact: "El ODS 9 moderniza la infraestructura con tecnología limpia y promueve la investigación científica aplicada a nivel local."
    },
    {
        sdg: "ODS 5: Igualdad de Género",
        sdgNumber: 5,
        sdgColor: "#ff3a21",
        textColor: "#ffffff",
        icon: "fa-scale-balanced",
        emoji: "👩‍💼",
        character: "Red de Cuidados y Familias",
        role: "Equidad Social",
        dilemma: "\"Madres cuidadoras no pueden trabajar remuneradamente por falta de guarderías. ¿Dejamos el presupuesto intacto, abrimos jardines públicos o apoyamos cooperativas de cuidado?\"",
        left: {
            text: "Mantener presupuesto sin cambios",
            effects: { economy: -15, society: -20, environment: 0, budget: +10 },
            reaction: "Brecha laboral récord: 'Cientos de mujeres quedan excluidas de empleos formales'."
        },
        center: {
            text: "Cooperativas comunitarias de cuidado",
            effects: { economy: +20, society: +20, environment: +5, budget: -8 },
            reaction: "Red de cuidados: 'Madres trabajadoras crean casas nido barriales con certificación y salario digno'."
        },
        right: {
            text: "Inaugurar red de guarderías públicas",
            effects: { economy: +25, society: +20, environment: 0, budget: -15 },
            reaction: "Familias celebran: 'Seis mil niños acceden a estimulación temprana pública y de calidad'."
        },
        fact: "El ODS 5 valora los cuidados y el trabajo doméstico no remunerado, empoderando económicamente a las mujeres y familias."
    },
    {
        sdg: "ODS 15: Vida de Ecosistemas Terrestres",
        sdgNumber: 15,
        sdgColor: "#56c02b",
        textColor: "#0f172a",
        icon: "fa-tree",
        emoji: "🦉",
        character: "Guardaparques del Bosque Nativo",
        role: "Conservación de la Biodiversidad",
        dilemma: "\"Una empresa minera ofrece canon por extraer grava de un humedal virgen. ¿Autorizamos la cantera, declaramos Reserva Estricta o creamos un bioparque con senderismo guiado?\"",
        left: {
            text: "Autorizar extracción de grava",
            effects: { economy: +15, society: -15, environment: -30, budget: +25 },
            reaction: "Humedal destruido: 'Aves migratorias abandonan la laguna contaminada por maquinaria pesada'."
        },
        center: {
            text: "Bioparque ecoturístico comunitario",
            effects: { economy: +15, society: +15, environment: +20, budget: -5 },
            reaction: "Ecoturismo en alza: 'Ex-mineros reconvertidos en guías naturales reciben turistas de todo el país'."
        },
        right: {
            text: "Declarar Parque Natural Intangible",
            effects: { economy: +15, society: +15, environment: +25, budget: +5 },
            reaction: "Santuario de flora: 'La UNESCO reconoce el bosque nativo de la ciudad como reserva de biosfera'."
        },
        fact: "El ODS 15 detiene la pérdida de biodiversidad y protege humedales y bosques frente a la degradación de ecosistemas."
    },
    {
        sdg: "ODS 16: Paz, Justicia e Instituciones Sólidas",
        sdgNumber: 16,
        sdgColor: "#00689d",
        textColor: "#ffffff",
        icon: "fa-landmark",
        emoji: "⚖️",
        character: "Auditoría Ciudadana",
        role: "Transparencia y Gobierno Abierto",
        dilemma: "\"Auditoría detectó sobreprecios del mandato anterior. ¿Sellamos el archivo para evitar juicios, publicamos todo en tribunales o abrimos un portal de datos transparentes con participación?\"",
        left: {
            text: "Sellar archivo y guardar silencio",
            effects: { economy: -15, society: -25, environment: 0, budget: -15 },
            reaction: "Escándalo filtrado: 'La ciudadanía denuncia encubrimiento en las puertas de la alcaldía'."
        },
        center: {
            text: "Portal de gobierno abierto y cabildos",
            effects: { economy: +15, society: +25, environment: +5, budget: +10 },
            reaction: "Transparencia Internacional premia al municipio: 'Cada centavo público puede auditarse en línea'."
        },
        right: {
            text: "Juicio penal público y restitución",
            effects: { economy: +15, society: +20, environment: 0, budget: +25 },
            reaction: "Justicia civil: 'Se recuperan diez millones de fondos defraudados para escuelas públicas'."
        },
        fact: "El ODS 16 fortalece la confianza ciudadana combatiendo la corrupción y fomentando instituciones eficaces y transparentes."
    },
    {
        sdg: "ODS 14: Vida Submarina y Costera",
        sdgNumber: 14,
        sdgColor: "#0a97d9",
        textColor: "#ffffff",
        icon: "fa-fish",
        emoji: "🐋",
        character: "Asociación de Pescadores Artesanales",
        role: "Zona Costera y Ribereña",
        dilemma: "\"Plásticos descartables asfixian la fauna ribereña. ¿No intervenimos, prohibimos plásticos con multas severas o creamos un sistema de envases retornables con comercios?\"",
        left: {
            text: "No regular el plástico descartable",
            effects: { economy: -15, society: -10, environment: -25, budget: +5 },
            reaction: "Pescadores en crisis: 'Las redes extraen más bolsas de polietileno que peces del río'."
        },
        center: {
            text: "Red de envases retornables de vidrio",
            effects: { economy: +15, society: +15, environment: +20, budget: -5 },
            reaction: "Comercio ribereño: 'El 80% de las bebidas circulan en botellas lavables y se crea empleo local'."
        },
        right: {
            text: "Prohibición estricta y subsidio de yute",
            effects: { economy: +10, society: +15, environment: +25, budget: -10 },
            reaction: "Riberas limpias: 'Familias disfrutan de playas fluviales sin residuos plásticos a la vista'."
        },
        fact: "El ODS 14 preserva los océanos y ríos combatiendo la contaminación por plásticos que amenaza la seguridad alimentaria."
    },
    {
        sdg: "ODS 10: Reducción de las Desigualdades",
        sdgNumber: 10,
        sdgColor: "#dd1367",
        textColor: "#ffffff",
        icon: "fa-handshake-angle",
        emoji: "🏘️",
        character: "Presupuesto Participativo Vecinal",
        role: "Cohesión Territorial",
        dilemma: "\"Disponemos de superávit. ¿Construimos un helipuerto ejecutivo, renovamos parques en barrios postergados o financiamos asambleas vecinales vinculantes?\"",
        left: {
            text: "Construir helipuerto ejecutivo",
            effects: { economy: +15, society: -25, environment: -10, budget: +15 },
            reaction: "Indignación barrial: 'Mientras faltan cloacas, la alcaldía gasta en lujos para pocos'."
        },
        center: {
            text: "Presupuesto participativo en asambleas",
            effects: { economy: +15, society: +25, environment: +10, budget: -10 },
            reaction: "Democracia activa: 'Vecinos deciden por voto directo iluminar calles y crear plazas deportivas'."
        },
        right: {
            text: "Pavimentación y cloacas en barrios vulnerables",
            effects: { economy: +10, society: +25, environment: +15, budget: -15 },
            reaction: "Histórica integración: 'Diez mil familias acceden por fin a agua corriente e iluminación LED'."
        },
        fact: "El ODS 10 reduce las asimetrías territoriales asegurando que todos los sectores de la ciudad disfruten de infraestructura digna."
    },
    {
        sdg: "ODS 17: Alianzas para Lograr los Objetivos",
        sdgNumber: 17,
        sdgColor: "#19486a",
        textColor: "#ffffff",
        icon: "fa-globe",
        emoji: "🤝",
        character: "Cumbre Mundial ONU Hábitat",
        role: "Cooperación Global 2030",
        dilemma: "\"¡Año 2029! La ONU evalúa el modelo de tu ciudad. ¿Nos aislamos para no compartir patentes, firmamos la Alianza Verde con la ONU o creamos un consorcio con ciudades hermanas?\"",
        left: {
            text: "Rechazar cooperación y aislarnos",
            effects: { economy: -10, society: -15, environment: -10, budget: +10 },
            reaction: "Aislamiento internacional: 'La ciudad queda excluida de fondos climáticos globales'."
        },
        center: {
            text: "Red de ciudades sostenibles en código abierto",
            effects: { economy: +20, society: +20, environment: +15, budget: +15 },
            reaction: "Liderazgo regional: 'Quince municipios vecinos adoptan las bio-políticas creadas en tu gestión'."
        },
        right: {
            text: "Firmar Fondo Verde Internacional ONU",
            effects: { economy: +20, society: +20, environment: +20, budget: +20 },
            reaction: "Reconocimiento global: 'Naciones Unidas declara a la ciudad como faro mundial de la Agenda 2030'."
        },
        fact: "El ODS 17 demuestra que los grandes desafíos de la humanidad solo se conquistan mediante la solidaridad, el conocimiento compartido y alianzas multilaterales."
    }
];
