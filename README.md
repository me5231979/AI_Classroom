# AI Basics — A Classroom Introduction

An interactive, single-page teaching site that introduces the fundamentals of
artificial intelligence to **Vanderbilt staff**. Built as a
**facilitation tool**: project it in class while learners scan a QR code to
follow along on their own devices, or share the link for self-paced review.

It wears the **Vanderbilt "Futures Learning Hub" (FLH)** visual system — black &
gold, Libre Caslon / Inter / Antonio, one-idea-per-screen pacing — re-purposed
from a marketing layout into a lesson.

---

## Running it

It's plain HTML/CSS/JS with no build step.

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly also works, but a server is recommended so the
Google Fonts load cleanly.

## Session flow

1. **Welcome slide** — shown on the projector as people arrive. It renders a
   **QR code automatically** from the page's own URL, so learners scan and
   launch the experience on their devices. (No regeneration needed when you
   deploy; to hard-code a different target, set
   `data-url="https://your-url"` on the `#qrCard` div in `index.html`.)
   When previewing from a local `file://` open, a placeholder appears instead.
2. **Hero** — headline, four **learning objectives**, and a **Higgsfield-generated
   3-clip montage** (staff at AI workstations → campus walk with tablets →
   lab wall-screen review) cycling ~15s per clip, streamed from the CDN with
   duotone + scrim applied by CSS. Clip URLs live in the hero `<video>`'s
   `data-playlist` attribute; a failed clip is skipped, and if all fail the
   gold particle canvas takes over.
3. Sections 01–09 — each is one projected **slide**, with a **"Go deeper"**
   expander underneath holding the content layer: practical workplace framing
   plus a labeled, timed activity — **As a group** (discussion with clear
   steps) or **On your own** (individual practice/reflection).
4. Scored recap quiz, flip-card glossary (reference), then a closing with ONE
   next step: Dr. Jules White's Coursera course, featured as the single
   call to action. Teaching videos are embedded in-flow (Sections 02 and 04);
   deeper links live inside the relevant "Go deeper" panels.

## Presenting in class

The page is a scrollable site **and** a keyboard-driven deck.

| Control | Action |
|---|---|
| `→` / `Space` / `Page Down` | Next slide |
| `←` / `Shift+Space` / `Page Up` | Previous slide |
| `Home` / `End` | First / last slide |
| Dot rail (right edge) | Jump to any slide |
| Bottom pill | Prev / next + slide counter |

A gold progress bar across the top tracks position. Each slide is a full
viewport "one idea," with a slide number and dark/light rhythm (opens and closes
dark) for pacing.

## The interactive teaching tools

| Slide | Tool | What learners do |
|---|---|---|
| What AI Is | **Nested rings** | Tap AI → ML → Deep Learning → Gen AI to see how the terms nest |
| Neural Networks | **Activatable network** | Press *Run* and watch a signal propagate layer by layer |
| Language Models | **Next-token predictor** | Build a sentence by picking from probability-ranked words |
| Randomness | **Temperature slider** | Drag from *Precise* to *Creative* and watch an answer rewrite itself |
| Prompting | **Prompt anatomy** | Hover/tap Role · Context · Task · Format to see each part in a real prompt |
| Strengths & Limits | **Knowledge check** | One-question check with instant feedback |
| Responsibility | **Knowledge check** | Privacy/ethics check with instant feedback |
| Recap | **Scored quiz** | 5 questions, live scoring, retry |
| Glossary | **Flip cards** | Flip 12 key terms to reveal definitions |

All interactions are keyboard-accessible, have visible focus states, use
`aria-live` for dynamic content, and honor `prefers-reduced-motion`.

## Content (8 sections)

1. What AI actually is — AI / ML / Deep Learning / Gen AI
2. How machines learn — supervised, unsupervised, reinforcement
3. Inside a neural network — layers, neurons, weights
4. Language models — tokens and next-word prediction
5. Steering the output — temperature and randomness
6. Prompting well — the four parts of a strong prompt
7. Strengths & limits — capabilities, failure modes, hallucination
8. Using AI responsibly — bias, privacy, accountability at work
9. Keeping the time AI saves — workload creep, wellbeing, EAP resources
   (grounded in the HBR intensification research, mirroring the FLH learn site)

To edit copy, open `index.html` — each `<section class="slide">` is one screen.
Quiz questions live in `assets/js/main.js` (the `QUESTIONS` array for the recap;
`data-correct` / `data-why` attributes for inline checks).

---

## Design system (FLH)

- **Color:** `--vu-black #1C1C1C`, `--vu-white`, flat gold `--vu-gold-flat #CFAE70`,
  and the metallic hero gradient (`#FEEEB6 → #CFAE70 → #B49248`), used once or
  twice per page only. Neutrals: cream `#F5F3EF`, sand, grays. Saturated hues
  (`#ECB748`, `#946E24`, `#B3C9CD`, `#8BA18E`) are reserved for the interactive
  diagrams. All tokens live at the top of `assets/css/styles.css`.
- **Type:** Libre Caslon Display (headlines, one italic word each), Inter (body/UI),
  Antonio (all-caps eyebrows). Fallbacks: Times New Roman / Arial / Impact.
- **Motion:** everything ≤ 400ms, ease-out, reveal-once, reduced-motion aware.

## Logos

The four official Vanderbilt EPS masters were converted to web-ready **RGB
transparent PNGs** (auto-trimmed and optimized) and live in `assets/img/`:

| File | Source EPS | Used on |
|---|---|---|
| `vu-lockup-white.png` | `Dimensional_V_White_Lockup_cmyk.eps` | Footer |
| `vu-lockup-black.png` | `Dimensional_V_Black_Lockup_cmyk.eps` | (available for light nav) |
| `vu-centered-white.png` | `VU_Centered_White_cmyk.eps` | Closing slide |
| `vu-centered-black.png` | `VU_Centered_Black_cmyk.eps` | (available for light closings) |
| `vu-v-icon.png` | cropped from the lockup | Nav mark |
| `favicon.svg` / `favicon-96.png` | derived | Browser tab |

The Vanderbilt wordmark is present in the footer, satisfying the FLH
sub-brand lockup requirement. Marks are for authorized use only — no
recoloring, stretching, or effects beyond the approved metallic treatment.

## Notes / limitations

- The QR library is `qrcode-generator` (MIT, Kazuhiko Arase), vendored at
  `assets/js/qrcode.js` — no network needed to render the code.
- **Fonts are self-hosted** in `assets/fonts/` (woff2, ~170 KB total, via the
  Fontsource builds of the Google families) — the deck renders identically
  with no internet in the classroom.
- The next-token probabilities and temperature samples are **illustrative**, not
  live model output — they're teaching aids.
- No frameworks and no network-dependent JS — one CSS file, one JS file, plus
  the vendored QR encoder. Easy Lighthouse scores, works offline.
