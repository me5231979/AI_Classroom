# AI Basics — Vanderbilt Manager Learning Series

Single-page interactive classroom experience. Live at
https://me5231979.github.io/AI_Classroom/ (GitHub Pages, served from the
`gh-pages` branch — publish with `git branch -f gh-pages main && git push -f origin gh-pages`).

## Standing design principles (do not regress these)

1. **Simulators, practice, and play opportunities throughout.** Every teaching
   section should let the learner DO something, not just read: a simulator
   (rings, neural net, token predictor, temperature slider, prompt anatomy,
   ML trainer), a practice exercise, or a knowledge check. When adding a
   section, add its interaction.
2. **Every section must be facilitatable and learning must be validatable.**
   Each teaching section carries a "Go deeper" panel with a labeled, timed
   activity — **As a group** (numbered discussion steps) or **On your own**
   (individual practice) — plus a validation point (inline knowledge check,
   simulator completion, or recap-quiz coverage). The per-section facilitator
   runbook lives in `facilitator/notes.json` (see FACILITATION.md).
3. **Facilitator version is planned (not yet built).** It will mirror this site
   with a facilitator-notes rail on the right of each slide, rendered from
   `facilitator/notes.json`. Keep that file in sync when slides change.
4. **Brand: Vanderbilt FLH system.** Black #1C1C1C / white / flat gold #CFAE70;
   metallic gradient once or twice per page; Libre Caslon Display headlines
   (one italic word), Inter body, Antonio eyebrows; motion ≤400ms, engraved
   not bubbly; real VU lockups in assets/img (authorized use only).
5. **No frameworks.** One CSS file, one JS file, vendored QR lib, self-hosted
   fonts. Everything must work offline except the hero montage (Higgsfield
   CDN, falls back to the particle canvas).

## Layout of the experience (17 slides)

Welcome/QR → Hero (objectives + Higgsfield 3-clip montage) → Agenda →
01 What AI is (rings) → manifesto → 02 How machines learn (ML trainer) →
03 Neural networks (run-the-network) → 04 LLMs (token predictor) →
05 Temperature (slider) → 06 Prompting (anatomy + Persona Pattern/Jules White) →
07 Limits (check) → 08 Ethics (check) → 09 Wellbeing (EAP, HBR research) →
Recap quiz (scored) → Glossary (flip cards) → Watch (curated videos) → Closing.

## Editing map

- Copy: `index.html` (one `<section class="slide">` per screen)
- Recap questions: `QUESTIONS` array in `assets/js/main.js`
- Inline checks: `.quiz` blocks with `data-correct`/`data-why` in index.html
- ML trainer scenarios: `TRAINER` array in `assets/js/main.js`
- Facilitator runbook: `facilitator/notes.json`
- Sister site (source of verified video links & wellbeing content):
  me5231979/estesstite → /learn
