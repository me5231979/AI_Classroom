# Scan-In Learning
### The deckless classroom: training delivered as a live site in every learner's hands

---

## What it is

Scan-In Learning replaces the projected slide deck with a live, interactive
website that plays two roles at once. The facilitator projects it at the front
of the room and drives it like a deck. Learners scan a QR code on the welcome
screen and the same experience opens on their own devices. From that moment
the room is no longer watching a presentation. Everyone is inside the
material: pressing the simulators, taking the knowledge checks, building
their own work products, while the facilitator teaches from the front.

The name describes the moment the model turns on. Learners scan in, and the
class stops being an audience.

## The problem it solves

Classroom training has three chronic gaps, and they compound:

1. **Slides are passive.** The learner's only verb is "watch." Practice, if
   it happens, lives in a separate worksheet or an awkward breakout, and it is
   the first thing cut when time runs short.
2. **The materials drift apart.** The deck, the handout, the facilitator
   guide, and the follow-up email are four documents in four files. Update
   one and the others quietly go stale.
3. **Delivery depends on the person.** A course is only as good as whoever
   happens to facilitate it that day, and most facilitator guides amount to
   "talking points" that a first-timer can't actually run a room with.

## How it works

**One source, two editions.** Every program is a single set of plain web
files. A build script generates two synchronized editions from it:

- **The learner edition** is the class itself. One idea per screen, paced
  like a deck (arrow keys, progress bar, slide dots), but every teaching
  section carries something to *do*: a simulator, a hands-on lab, a scored
  check, or a build-your-own exercise. It works projected, on a laptop, and
  on a phone, so the same link serves in-person, virtual, and self-paced
  delivery without modification.
- **The facilitator edition** is the same deck with a scripted rail beside
  every slide, built on the ATD facilitator-guide framework: a verbatim
  **Say** script, **Do** choreography, an **Ask** with anticipated learner
  responses, a **Debrief** line, and a scripted **Transition** into the next
  section, plus timing for a full-length and a compressed path. It opens with
  a briefing slide covering prep checklists, materials, contingencies, and a
  tough-questions bank. A facilitator who has never taught the course can
  deliver it from the rail alone. Its QR code points at the learner edition,
  so the room scans straight off the projected screen.

Because both editions generate from one source, they cannot drift. Change the
course and the facilitator guide updates with it.

**The link is the takeaway.** There is no separate handout to lose. The URL
learners scanned in class is the reference they keep, along with a printable
cheat sheet built into the experience. Learning transfer starts with material
people can actually find again.

## The design rules

Every Scan-In program follows the same standards, so quality doesn't depend
on the author's mood:

- **Do something every section.** Each teaching idea pairs with an
  interaction. No screen is read-only.
- **A reason on every activity.** Learners see a "why this matters" line on
  each exercise. Nothing feels like busywork because nothing is.
- **Validate before moving on.** Every section has a checkpoint the
  facilitator can see: an inline check, a simulator completion, or coverage
  in the scored recap. The facilitator always knows whether the idea landed.
- **End in transfer, not applause.** The capstone is a personal application
  plan the learner builds and keeps. The class ends with each person holding
  their own next step, not a summary slide.
- **Two timing paths.** Every program ships with a full path and a core path
  so it fits the calendar slot it actually gets, with explicit rules about
  what to cut and what to protect.
- **Measurement is built in**, mapped to the Kirkpatrick model: in-the-moment
  reaction checks (Level 1), scored checks and a recap quiz tied one-to-one
  to the learning objectives (Level 2), and the capstone plan plus a
  scheduled two-week follow-up (Level 3).

## The library at scale

This is where the model changes the economics of a learning team. A Scan-In
program is plain HTML, CSS, and JavaScript. No LMS seats, no authoring-tool
licenses, no app installs, nothing to provision. It publishes to a URL and
runs on whatever device walks into the room.

Combined with AI-assisted authoring, that means a team can stand up an
**on-demand library**: complete programs, each with its matching facilitator
edition, produced in days instead of quarters. Any trained facilitator (at
Vanderbilt, our Navigators) can pull a course from the library and deliver it
with confidence, in person or virtually, because the delivery expertise is
scripted into the course itself rather than locked in one person's head.

## Proof of concept

**AI Basics** in the Vanderbilt Learning Series is the pilot:

- Learner edition: https://me5231979.github.io/AI_Classroom/
- Facilitator edition: https://me5231979.github.io/AI_Classroom/facilitator/

Nine teaching sections, six interactive simulators, a hands-on prompt lab, a
scored recap mapped to five learning objectives, a personal-plan capstone,
and a fully scripted ATD facilitator guide with 91-minute and 60-minute
paths. Built in the Vanderbilt FLH design system, it runs on any device with
a browser and nothing to install.

## What to call the pieces

| Term | Meaning |
|---|---|
| **Scan-In Learning** | The delivery model: one live site, projected and in every learner's hands |
| **Program** | One course; a single source that builds both editions |
| **Learner edition** | The class experience; also the takeaway reference |
| **Facilitator edition** | The mirrored deck with the ATD-scripted rail and briefing |
| **The library** | The growing catalog of programs any Navigator can deliver on demand |
