# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Estudiantes universitarios y docentes en formación, en contextos de educación para la sostenibilidad, ciencias sociales, educación cívica o didáctica. Juegan en el aula o en talleres, de forma individual o en grupo con proyección, desde computadora o teléfono. Su tarea: experimentar cómo se tensionan las dimensiones ambiental, social, económica y de gobernanza al gobernar una ciudad rumbo a 2030.

## Product Purpose

"Alcalde 2030" es un simulador de gestión urbana en el que el jugador asume la alcaldía de una ciudad contemporánea y atraviesa 17 dilemas, uno por cada Objetivo de Desarrollo Sostenible, desde 2024 hasta 2030. Cada decisión altera cuatro pilares —Medio Ambiente, Sociedad, Economía y Gobernanza— y el mandato termina si cualquiera llega a 0 %.

El éxito del producto es que el jugador comprenda, jugando, que las políticas públicas sostenibles implican trade-offs: no existe una opción gratuita para todas las dimensiones, y descuidar una puede hacer colapsar el conjunto. La partida cierra con un rango de mandato (S, A, B o C) según el promedio y el equilibrio final.

## Positioning

El mecanismo diferenciador es la decisión tripartita en cada dilema: Opción A (austeridad pragmática), Opción B (transformación verde de alto costo) y Opción C (tercera vía de alianza comunitaria e innovación circular). Frente a los simuladores binarios de sí/no, obliga a razonar sobre costo, impacto y legitimidad al mismo tiempo, con cuatro pilares en tensión permanente y poderes de emergencia limitados.

## Operating Context

- Se ejecuta abriendo `index.html` en un navegador; no requiere instalación, compilación ni servidor local.
- Partidas breves, pensadas para una sesión de clase o taller; no hay cuentas, registro ni persistencia entre sesiones.
- Interacción por tres vías: botones bajo la tarjeta, teclado (A / W / D o flechas) y arrastre o swipe de la tarjeta (izquierda = A, arriba = C, derecha = B).
- Incluye bitácora de decisiones, modo asesor con pistas de impacto, consulta ciudadana, fondo verde de emergencia, pacto público-privado, teletipo de reacciones, audio procedural y dos temas (luz natural / bosque profundo).
- El juego está redactado en español y usa el marco y los nombres oficiales de los 17 ODS.

## Capabilities and Constraints

- 17 tarjetas de dilema con tres opciones cada una; cada opción define efectos numéricos sobre los cuatro pilares, una reacción de prensa o ciudadanía y un dato del ODS correspondiente.
- Los cuatro pilares inician en 50 %. Llegar a 0 % en cualquiera termina el mandato de inmediato; completar los 17 dilemas termina la partida con rango S (>75 % y equilibrio), A (60–74 %), B (45–59 %) o C (<45 %).
- Poderes por partida: Consulta Ciudadana (2 usos, revela impactos exactos), Fondo Verde de Emergencia (1 uso, +25 % al pilar más crítico) y Pacto Público-Privado (1 uso, anula el costo de presupuesto de la siguiente decisión).
- Arquitectura estática: HTML, Tailwind CSS por CDN, JavaScript vanilla y Web Audio API; sin backend ni base de datos.
- Dependencias externas por CDN: Tailwind, Font Awesome y Google Fonts (Plus Jakarta Sans, Fraunces). Requiere conexión a internet para verse y funcionar como está diseñado.
- No hay guardado de progreso: recargar la página reinicia el mandato.
- Estado actual del repositorio: `index.html` referencia `css/styles.css`, `js/cardsData.js` y `js/app.js`, pero esos archivos están en la raíz del proyecto. Hasta corregir esas rutas, el juego no carga sus estilos ni su lógica.
- Decisiones abiertas: licencia de uso y publicación no definidas; no se estableció un estándar formal de accesibilidad; no hay requisitos de marca institucional externa.

## Brand Commitments

- Nombre en uso: "Alcalde 2030" / "Alcaldía 2030".
- Idioma: español, con registro cívico-institucional cercano (vecinos, barrios, concejo) y tono educativo, no partidista.
- Identidad visual existente de inspiración biofílica y natural (paleta verde tierra, tipografías Fraunces y Plus Jakarta Sans, rueda de colores ODS). Se registra como estado actual del proyecto, no como una restricción visual confirmada por el usuario.
- Sin logo, institución, patrocinador ni respaldo oficial de la ONU registrado en el proyecto.

## Evidence on Hand

- `cardsData.js`: 17 dilemas completos con opciones, efectos, reacciones y datos de ODS.
- `app.js`: motor de juego, audio procedural, gestos, poderes y modales.
- `index.html` y `styles.css`: interfaz, temas y animaciones.
- `README.md`: guía funcional del simulador, reglas, controles y estrategia.
- No existen testimonios, métricas de uso, casos de estudio, datos oficiales citados ni material de prensa. El trabajo futuro no debe inventarlos ni atribuir respaldos institucionales.

## Product Principles

1. **Enseñar por consecuencias, no por sermones.** Cada elección debe mostrar su efecto en los pilares y una reacción verosímil de la ciudadanía.
2. **La interdependencia es la lección central.** El colapso por un solo pilar a 0 % debe sentirse como consecuencia lógica del descuido, no como castigo arbitrario.
3. **Pensar en compromisos, no en respuestas correctas.** La tercera vía existe para modelar la búsqueda de impacto con costo y legitimidad compartidos.
4. **Listo para el aula.** Partida corta, controles evidentes, sin registro ni fricción técnica, legible en proyector y en pantalla de teléfono.
5. **Fidelidad al marco ODS.** Los 17 objetivos y su lenguaje se respetan; cualquier dato nuevo debe ser verificable y asumido como contenido, nunca inventado para dramatizar.

## Accessibility & Inclusion

No hay un estándar formal acordado. El diseño declara soporte para escritorio, tablet y teléfono, controles táctiles de al menos 64 px, atajos de teclado y alternancia de tema claro/oscuro. Cualquier trabajo futuro debe conservar esas vías de interacción y no depender exclusivamente del gesto.
