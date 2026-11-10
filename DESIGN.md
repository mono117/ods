---
name: Alcaldía 2030
description: A civic-wayfinding simulator for the 17 SDGs, 2026–2030.
colors:
  ink: "#15171C"
  ink-soft: "#2A2E36"
  paper: "#F2F2EE"
  surface: "#FFFFFF"
  surface-2: "#E9EAE5"
  line: "#D6D8D2"
  line-strong: "#B9BDB4"
  muted: "#5B6159"
  muted-2: "#6B7169"
  on-ink: "#F4F4F0"
  on-ink-muted: "#AEB3AA"
  signal: "#C13D19"
  signal-hover: "#A93416"
  signal-line: "#D9471F"
  signal-on-ink: "#F06A42"
  signal-ink: "#B93A1B"
  pillar-eco: "#B8871F"
  pillar-soc: "#B0473A"
  pillar-env: "#2F6B4F"
  pillar-bud: "#2B5F8A"
  pillar-eco-ink: "#7A5A10"
  pillar-soc-ink: "#8E2F24"
  pillar-env-ink: "#2A6047"
  pillar-bud-ink: "#245273"
  path-a: "#A23B2A"
  path-c: "#8A6412"
  critical: "#B3261E"
  ok: "#2F6B4F"
typography:
  brand:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  modal-title:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  context-title:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0em"
  dilemma:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "-0.01em"
  character-name:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  option-text:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0em"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  micro:
    fontFamily: "Archivo Narrow, Archivo, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.13em"
  data:
    fontFamily: "Archivo Narrow, Archivo, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
rounded:
  chip: "1px"
  plate: "2px"
  round: "50%"
spacing:
  xs: "10px"
  sm: "12px"
  md: "14px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
components:
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    size: "44px"
  icon-button-inverse:
    backgroundColor: "transparent"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.plate}"
    size: "44px"
  icon-button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "#FFFFFF"
    rounded: "{rounded.plate}"
    size: "44px"
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "#FFFFFF"
    rounded: "{rounded.plate}"
    padding: "12px 16px"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "12px 16px"
    height: "46px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "14px"
  choice-a:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "10px 12px"
  choice-c:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "10px 12px"
  choice-b:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "10px 12px"
---

# Design System: Alcaldía 2030

## Overview

**Creative North Star: "Señalética cívica"**

The interface is a municipal wayfinding system, not a dashboard. Every screen is a sign in a public building: ink on paper, a route line, a plate for each decision, and four gauges that never leave view. The mandate from 2026 to 2030 is drawn as 17 stations; each dilemma is the next stop, and the press ticker is the announcement read over the concourse.

The world is deliberately flat. Structure comes from 1px hairlines, 2px corners, and full ink-on-paper contrast. There are no gradients, no glass, no blur, and no soft shadows; a surface separates from its neighbor by a border or a step in paper tone. Color is data first: four pillar inks own the measurements, three path inks own the options, and a single signal orange is reserved for the next action and the distance already travelled.

The build is read in two conditions that set the scale: projected in a classroom and held on a phone. That is why the dilemma is the largest reading text, why every changing number is set in tabular Archivo Narrow, and why the three options stay full-width and visible instead of collapsing into a menu. The direction contract named one signal orange; the shipped build splits it into a fill-grade `signal` and a brighter `signal-line` for the mandate progress. The build wins, and both are recorded below.

**Key Characteristics:**
- Flat civic wayfinding: 1px hairlines, 2px plates, zero gradient, zero glass, zero soft shadow.
- Ink (#15171C) on paper (#F2F2EE), with white surfaces for working documents.
- One signal orange for action, focus, and mandate progress; never decoration.
- Four pillar inks own the four measurements; three path inks own A / C / B.
- Archivo reads; Archivo Narrow measures. Changing numbers are tabular.
- The 17-station mandate line is the signature component.
- 44px icon targets, 46px buttons, 60px choices; all three options always visible.

## Colors

A two-tone civic print palette: near-black ink, cool paper, four data inks, one signal, and two state colors.

### Primary
- **Signal Orange** (#C13D19): primary button and active icon-button fill, focus ring, selected tool state. It is the only color allowed to mean "act now."
- **Signal Line** (#D9471F): the mandate route progress only. Brighter than the fill so it reads as a travelled line rather than a button.
- **Signal on Ink** (#F06A42): the press label inside the dark ticker and the signal ink on dark surfaces, where #C13D19 would sink into the ground.
- **Signal Ink** (#B93A1B): signal-coloured text on paper, used by the "Ver todo" link and the fact-box label.

### Secondary
- **Ocre** (#B8871F): Economía. Its darkened ink (#7A5A10) carries the percentage numeral; the base fills the meter and impact dot.
- **Ladrillo** (#B0473A): Sociedad. Same split: ink (#8E2F24) for the numeral, base for the measured mark.
- **Verde** (#2F6B4F): Ambiente, and also the success state. One green means both "this pillar is healthy" and "this effect helped." Its ink is #2A6047.
- **Azul** (#2B5F8A): Presupuesto, and the neutral-impact dot when a decision moves nothing. Its ink is #245273.

### Tertiary
- **Austerity Red** (#A23B2A): Opción A, the immediate or austere path. The 30px letter plate is the base color; the "OPCIÓN A" label uses the ink variant.
- **Third-Way Ochre** (#8A6412): Opción C, the community or circular innovation path. Warmer and quieter than the signal orange so it never competes with a primary action.
- **Transformation Green** (#2F6B4F): Opción B, the high-cost green path. It shares the Ambiente hue because both describe the environmental axis.

### Neutral
- **Ink** (#15171C): body text, header bar, ticker, dark fills, and the strongest border on an active card.
- **Ink Soft** (#2A2E36): secondary dark surfaces and the dark-theme ink step.
- **Paper** (#F2F2EE): page ground. The default background behind every panel.
- **Surface** (#FFFFFF): panels, decision cards, modal sheets, and choice rows.
- **Surface 2** (#E9EAE5): recessed blocks, meter tracks, keycaps, power buttons, and hover fills.
- **Line** (#D6D8D2): the standard 1px divider inside panels and between list rows.
- **Line Strong** (#B9BDB4): the outer border of the decision card, the route rail, and ghost-button borders.
- **Muted** (#5B6159): supporting copy, dates, metadata, and status words.
- **Muted 2** (#6B7169): the quietest labels, hints, and future-state marks.
- **On Ink** (#F4F4F0): text and icons on the ink bar and ticker. Not pure white; it keeps the printed-paper temperature.
- **On Ink Muted** (#AEB3AA): the brand subtitle and the "Mandato" label on the ink bar.
- **Critical** (#B3261E): a pillar at or below 20%, negative effects, and the critical meter outline.
- **Ok** (#2F6B4F): positive effects and the confirmed-choice check.

The dark theme is a polarity swap, not a second palette. Ink becomes the ground, panels step upward from near-black to lifted surface tones, signal fills hold their hue while the route brightens, and the semantic inks brighten so the same meanings survive. Hairlines persist by using the dark line steps; no component changes shape between themes.

### Named Rules

**The One Signal Rule.** Signal orange appears only on the next action, the focus ring, the selected tool, and the mandate progress. It never washes a background, titles a section, or decorates a chart.

**The Pillar Ownership Rule.** Each pillar ink owns exactly one meter, one percentage numeral, and one impact dot. Opción B's green is the single intentional overlap with Ambiente; otherwise a pillar color never appears on another pillar's data or in general chrome.

**The Data-Not-Decoration Rule.** Pillar and path colors are information. If removing the color would not remove a meaning, the color does not belong there.

## Typography

**Display Font:** Archivo (with system-ui, Segoe UI fallback)
**Body Font:** Archivo (with system-ui, Segoe UI fallback)
**Label/Data Font:** Archivo Narrow (with Archivo fallback)

**Character:** One grotesque in two widths. Archivo carries reading and authority; Archivo Narrow carries the sign-maker's register — field labels, dates, tags, keycaps, and every number that changes. The pairing is a single family, so the page feels printed rather than styled.

### Hierarchy
- **Brand** (800, 18px, 1.0): the "Alcaldía 2030" wordmark only. The subtitle beneath it is 10px Narrow, 500, 0.13em, uppercase.
- **Modal title** (800, 24px, 1.15): welcome, defeat, and victory headlines; the compact variant is 18px.
- **Context title** (700, 16px, 1.3): the SDG name in the side panel.
- **Dilemma** (500, 17px, 1.45, max 48ch; 19px at 980px and up): the decision question, the largest reading text in the app.
- **Character name** (700, 15px, 1.25): the named speaker above an 11px uppercase role line.
- **Option text** (600, 14px, 1.3): the three choice labels.
- **Body** (400, 12–14px, 1.45–1.55): facts, descriptions, press copy, and log quotes. Keep prose below 48ch inside the card.
- **Micro label** (600–700, 10–12px, 0.08–0.15em, uppercase): field names, panel titles, tags, dates, and the route header.
- **Data** (700, 24–26px, tabular numerals): pillar percentages, panel averages, and counters; 8–15px when the same numerals sit inside chips or keycaps.

### Named Rules

**The Two-Voice Rule.** Archivo sets everything that is read as a sentence. Archivo Narrow sets everything that is scanned as a sign: labels, dates, tags, keycaps, and data. Never set body copy in Narrow; never set a changing number without tabular figures.

**The Label-Tests-Value Rule.** Uppercase micro type must name a field, a state, or a control that sits next to it. It is never a decorative eyebrow above a heading that already says the same thing.

## Layout

Mobile first, one column, capped at 1440px. The app frame uses 12px padding on phones, 16px from 980px, and 20px from 1440px. The workspace gap is 12px on phones and 16px above 980px. The spacing rhythm is 10 / 12 / 14 / 16 / 20 / 24; internal stacks use 8, 10, 12, or 14.

The reading order never changes: pillars, decision, context. Only the axis and the number of columns change.

- **Base (<640px):** header wraps into identity and a full-width control row; pillars sit as a four-up strip; choices stack full width; context panels stack below the stage.
- **640px:** log entries move their date to the right; a log tag caps at 68% width.
- **700px:** the three choices fan into equal columns with a 112px minimum height; the context panel becomes two side-by-side sections divided by a 1px vertical rule.
- **980px:** workspace becomes a 280px gauge rail plus the stage. Pillars turn vertical, each row separated by a 1px line. The card grows to 20px padding, a 360px minimum, and a 19px dilemma. The modal stops being a bottom sheet and centers.
- **1200px:** a third 320px context column appears; header and both side panels become sticky (header height 64px). Keyboard shortcuts and keycap hints become visible. The card reaches 380px minimum.
- **1440px:** outer padding grows to 20px; columns stay fixed.

### Named Rules

**The Rail Rule.** From 980px the four pillars stop being a horizontal strip and become a vertical gauge rail. The order — Economía, Sociedad, Ambiente, Presupuesto — never changes, only the axis.

**The Three-Across Rule.** A / C / B stay stacked and full-width until 700px, then fan into three equal columns. They are never hidden behind a menu, a tab, or an instruction to swipe.

**The 1440 Rule.** Content stops growing at 1440px. Wider screens earn margin, not more columns.

## Elevation & Depth

There are no shadows. The system uses no `box-shadow`, no gradient, no blur, and no backdrop filter. Depth is conveyed by four devices only: a 1px hairline, a step from paper to surface, a solid ink band that cuts the page, and the deck ghost — a bordered plate offset 5px behind the decision card so the deck reads as a stack of paper.

The modal scrim (`rgba(12, 14, 18, 0.64)`) is occlusion, not elevation. The critical meter uses a 1px outline offset 2px, and focus uses a 2px signal outline offset 2px; both are borders drawn outward, not glows. Dark mode does not introduce shadows to compensate for the lower contrast; it relies on the same hairlines and surface steps.

### Named Rules

**The Edge-In-Place-of-Shadow Rule.** If a surface needs to separate, give it a 1px border, a paper-tone step, or an offset plate. Never a shadow. A shadow is a missing border.

**The Flat-State Rule.** Hover may change border color or background tone; it may not lift, glow, or scale a surface. The only permitted hover or press displacement is the 1px press on buttons and choices; card motion belongs to the swipe gesture, not to hover.

## Shapes

The form language is the printed plate: square-shouldered, thin-edged, and clipped close. The default radius is 2px. Micro chips and the 17-cell SDG grid use 1px. The only circles are the 48px character avatar, the 5px station stops on the mandate route, and the 8px SDG dot in the recent-decree list; a circle always marks a person, a station, or a single record, never a button.

Borders are 1px at rest. A 2px border is reserved for state: the focus ring, the current SDG chip outline, and the bottom edge of a keycap. The brand mark is four vertical 4px bars with 3px gaps, a miniature pillar chart. The mandate progress is 3px; the pillar meter is 4px; both are square-ended. The mobile modal sheet rounds its top corners at 2px and meets the viewport bottom square, as if clipped by the screen; from 980px all four corners return to 2px.

### Named Rules

**The Plate Rule.** Corners are 2px, or 1px on micro chips. Nothing is a pill, and nothing is rounder than 2px except a circle that marks a person, a station, or a single record.

**The Two-Weight Border Rule.** A 1px line divides; a 2px line answers state. If every border is 2px, nothing is emphasised.

## Components

### Buttons

Square-shouldered signs, not pills. Primary and ghost buttons are 2px plates with a 1px border, a 46px minimum height, 12px × 16px padding, and Archivo Narrow 14px / 700 / 0.03em. Labels use sentence case ("Comenzar Mandato"), not uppercase. Icon buttons are 44px squares.

- **Primary:** signal fill, white text. Hover darkens to signal-hover; active moves down 1px; focus draws the 2px signal outline at 2px offset.
- **Ghost:** transparent fill, 1px line-strong border, ink text. Hover fills with surface-2 and swaps the border to ink.
- **Icon (ink):** 44px square, surface fill, 1px line border, 2px radius. Hover moves the border to ink. The icon is 16–18px and inherits currentColor.
- **Icon (inverse):** transparent fill inside the ink bar, a 22% paper border, on-ink glyph. Hover fills with 8% paper and strengthens the border to 50%.
- **Icon (primary):** signal fill and border, white glyph; the active tool state reuses this exact treatment so "selected" and "primary" are one signal.

### Chips

- **SDG tag:** a 2px plate with 5px × 8px padding, Archivo Narrow 11px / 700, uppercase, and a 7px gap to its icon. Background and text come from the SDG record, not from the global palette; ODS 7 is `#FCC30B` with `#0F172A`. The label wraps instead of truncating.
- **SDG progress chip:** 17 equal cells in one grid, each square by aspect ratio, 1px radius, 8px / 700 tabular numeral. Future cells are transparent with a 1px line border; passed cells drop to 55% opacity; the current cell takes a 2px ink outline at 1px offset.
- **Power count:** an 18px ink plate with a 10px paper numeral, tabular. In dark mode the plate becomes line-strong and the numeral becomes text.
- **Log tag:** a 2px plate with 3px × 6px padding and 11px / 700 Narrow, filled from the decision's SDG color.

### Cards & Containers

- **Panel:** surface fill, 1px line border, 2px radius, 14px padding (16px from 980px). Sections inside a panel are divided by 1px lines, never by gaps or nested cards.
- **Decision card / expediente:** surface fill, 1px line-strong border, 2px radius, 14px internal gap, 16px padding growing to 20px, and a 300 → 360 → 380px minimum height. It holds the SDG tag and index, a 48px round avatar with the character name and role, the dilemma, and a foot separated by a 1px top line. The deck ghost sits 5px behind it.
- **Modal sheet:** surface fill, 1px line-strong border, 2px radius, 20px padding (24px from 980px), max 520px wide (680px for the log). It is a bottom sheet below 980px and a centered plate above.
- No container carries a shadow. The deck ghost is a bordered plate, not a shadow.

### Navigation

The top bar is a solid ink band with on-ink text and a 1px black bottom edge. Its inner row is 10px × 12px with a 10px / 16px wrap gap. The brand is the four-bar pillar mark plus an 18px / 800 wordmark and a 10px Narrow uppercase subtitle. The mandate date sits at the right, separated by a 1px 18% paper rule, followed by 44px icon buttons. Below 640px the right side takes the full row and spreads between date and toolbar; the powers label hides. The bar is sticky only from 1200px.

### Choice Plate (A / C / B)

The three-path decision is a full-width row: a 30px letter plate, a two-line text block, and a trailing hint. The plate is the path color with a white Narrow 15px / 700 letter; the meta label is 11px / 700 uppercase in the path ink; the option text is 14px / 600. Hover fills surface-2 and moves the border to ink; active moves down 1px. From 700px the rows become three equal columns with a 112px minimum and the hint drops to the bottom-right. A stays red, C stays ochre, B stays green, and the visual order is always A, C, B even though the center position is the third way.

### Pillar Meter

Each pillar is a label, a tabular numeral, a status word, and a 4px track. The value is 26px / 700 Narrow in the pillar ink (24px in the vertical rail); the status is 11px muted. The track is surface-2 with no radius; the fill is the pillar base color and animates width at 0.45s on the standard ease. At or below 20% the numeral turns critical and the track gains a 1px critical outline at 2px offset — never a shadow, never a pulse. The impact dot is a 20px × 18px plate at the top-right, hidden at 80% scale until previewed; up is ok green, down is critical red, flat is budget blue, and neutral is eco ochre with ink text. In the vertical rail the name sits above, status left, value right, meter full-width below, and rows divide on 1px lines.

### Mandate Route (signature)

The 17-station line is the identity of the product. A 20px-tall route holds a 1px line-strong rail at 9px, a 3px signal-line progress bar at 8px, and 17 station ticks distributed with space-between. Each tick is a 5px circle with a surface fill and a 1px line-strong border. The progress starts at a 6% minimum and animates width at 0.45s on the standard ease. Above it, a Narrow 11px / 600 uppercase header sets "2026" left, the decision counter centered, and "2030" right, in muted grey except the counter. The route is `aria-hidden`; the counter carries the accessible state. This is the only place signal-line appears.

### Log Entry

The mandate log is a stack of 1px-separated entries with 12px vertical padding; the first entry has no top rule. On mobile the head stacks tag over date; from 640px it becomes a row with the date at the right. The tag is the SDG plate, the choice line is 13px / 600 with a green check, the quote is 12px muted behind a 1px dotted top border, and the effects row is 11px Narrow tabular in ok green and critical red.

## Do's and Don'ts

### Do:
- **Do** structure with 1px hairlines and 2px plates; let the border do the work a shadow would do elsewhere.
- **Do** keep signal orange for the primary action, focus, the selected tool, and the mandate progress — nowhere else.
- **Do** give each pillar its own color in exactly three places: meter, numeral, and impact dot.
- **Do** set every changing number in Archivo Narrow with tabular figures.
- **Do** keep A / C / B stacked until 700px, then three across; all three options stay visible at every width.
- **Do** hold the 44px icon / 46px button / 60px choice target minimums.
- **Do** use surface-2 to recess a block; use a paper-to-surface step to raise one.
- **Do** let SDG names wrap; the tag grows in height rather than truncating the goal.

### Don't:
- **Don't** add gradients, glass, blur, backdrop filters, or soft shadows to any surface.
- **Don't** round anything above 2px except the character avatar, the route stations, and the single-record SDG dot.
- **Don't** use signal orange as a background wash, a chart series, or a decorative bar.
- **Don't** introduce a second accent for hover; signal-hover is the only darkening.
- **Don't** move a pillar or path color outside its own data.
- **Don't** put an uppercase eyebrow above a heading that already carries the meaning; micro labels only name fields, states, and controls.
- **Don't** hide a decision behind a menu, a tab, or a gesture-only interaction.
- **Don't** use a shadow, glow, or pulse to signal a critical pillar; use the 1px critical outline and the critical numeral.
- **Don't** lower the opacity of a surface to fake depth; opacity belongs to spent powers and passed stations.
