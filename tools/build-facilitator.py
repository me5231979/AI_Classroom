#!/usr/bin/env python3
"""Generate the facilitator edition at facilitator/index.html.

Mirrors the learner site (index.html) and renders the runbook
(facilitator/notes.json) as a notes rail on the right of each slide.
Run after editing index.html or notes.json:

    python3 tools/build-facilitator.py
"""
import json, re, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEARNER_URL = "https://me5231979.github.io/AI_Classroom/"

s = open(os.path.join(ROOT, 'index.html')).read()
notes = json.load(open(os.path.join(ROOT, 'facilitator', 'notes.json')))
by_id = {sec['id']: sec for sec in notes['sections']}

# ---- 1. asset + link paths (one directory deeper) ----
s = s.replace('href="assets/', 'href="../assets/')
s = s.replace('src="assets/', 'src="../assets/')
s = s.replace('href="cheatsheet.html"', 'href="../cheatsheet.html"')

# ---- 2. head: title, noindex, no canonical/og confusion ----
s = s.replace('<title>AI Basics: A Classroom Introduction | Vanderbilt</title>',
              '<title>AI Basics — Facilitator Edition | Vanderbilt</title>')
s = re.sub(r'<link rel="canonical"[^>]*>\n', '', s)
s = s.replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n<meta name="viewport"')

# ---- 3. QR points at the LEARNER site ----
s = s.replace('<div class="qr-card" id="qrCard" data-reveal>',
              f'<div class="qr-card" id="qrCard" data-reveal data-url="{LEARNER_URL}">')
s = s.replace('Follow along on your own device. Every demo here is hands-on. Or just watch the screen; we\'ll drive.',
              'Learners scan this code and land on the learner edition; your screen keeps the notes. Every demo is hands-on.')

# ---- 4. body class + nav badge ----
s = s.replace('<body>', '<body class="fac">')
s = s.replace('''    <img class="nav__vicon" src="../assets/img/vu-v-icon-nav.png" alt="Vanderbilt University" width="34" height="25">
  </a>''',
'''    <img class="nav__vicon" src="../assets/img/vu-v-icon-nav.png" alt="Vanderbilt University" width="34" height="25">
    <span class="fac__badge">Facilitator Edition</span>
  </a>''')

# ---- 5. inject the notes rail into each slide that has runbook notes ----
def rail(sec):
    def esc(t): return html.escape(t, quote=False)
    steps = ''.join(f'<li>{esc(x)}</li>' for x in sec.get('facilitate', []))
    parts = [
        f'<div class="facnote__head"><span>Facilitator</span>'
        f'<span>Full {sec.get("minutes","–")} min · Core {sec.get("coreMinutes","–") or "skip"}</span></div>',
        f'<p class="facnote__purpose">{esc(sec.get("purpose",""))}</p>',
        f'<ol class="facnote__steps">{steps}</ol>' if steps else '',
        f'<p class="facnote__meta"><b>Validate:</b> {esc(sec["validate"])}</p>' if sec.get('validate') else '',
        f'<p class="facnote__meta"><b>Watch for:</b> {esc(sec["watchFor"])}</p>' if sec.get('watchFor') else '',
        f'<p class="facnote__meta facnote__core"><b>60-min core:</b> {esc(sec["coreNote"])}</p>' if sec.get('coreNote') else '',
    ]
    return '<aside class="facnote" aria-label="Facilitator notes">' + ''.join(parts) + '</aside>'

count = 0
for sid, sec in by_id.items():
    pat = re.compile(r'(<section class="slide[^"]*" id="' + sid + r'"[^>]*>.*?)(\n  </section>)', re.S)
    m = pat.search(s)
    if not m:
        continue
    s = s[:m.end(1)] + '\n    ' + rail(sec) + s[m.end(1):]
    count += 1

# ---- 6. facilitator styles ----
FAC_CSS = '''
<style>
/* ============ facilitator edition ============ */
.fac__badge { font-family: var(--font-condensed); font-weight: 700; text-transform: uppercase;
  letter-spacing: .08em; font-size: .7rem; color: var(--vu-black); background: var(--vu-gold-flat);
  padding: .3rem .55rem; border-radius: 3px; margin-left: .9rem; white-space: nowrap; }
@media (min-width: 1200px) {
  body.fac .slide { display: grid; grid-template-columns: minmax(0,1fr) 350px; align-items: center; column-gap: 0; overflow: visible; }
  body.fac .slide > .wrap { grid-column: 1; }
  body.fac .slide > .hero__video, body.fac .slide > .hero__canvas, body.fac .slide > .hero__scrim { grid-column: 1 / -1; }
  body.fac .facnote { grid-column: 2; align-self: start; position: sticky; top: calc(var(--nav-h) + 16px);
    margin: 0 18px 0 0; }
  body.fac .dots { display: none; } /* rail replaces the dot rail on the right */
}
.facnote {
  background: rgba(20,20,20,.96); color: rgba(255,255,255,.85); border: 1px solid rgba(207,174,112,.45);
  border-left: 3px solid var(--vu-gold-flat); border-radius: 6px; padding: 1rem 1.1rem;
  font-size: .82rem; line-height: 1.5; max-height: calc(100vh - var(--nav-h) - 48px); overflow: auto; z-index: 5;
}
@media (max-width: 1199px) { .facnote { margin: 1.5rem var(--pad-x) 0; } }
.facnote__head { display: flex; justify-content: space-between; gap: .5rem; align-items: baseline;
  font-family: var(--font-condensed); font-weight: 700; text-transform: uppercase; letter-spacing: .07em;
  font-size: .68rem; color: var(--vu-gold-flat); border-bottom: 1px solid rgba(207,174,112,.3);
  padding-bottom: .5rem; margin-bottom: .6rem; }
.facnote__purpose { margin: 0 0 .6rem; color: #fff; font-weight: 500; }
.facnote__steps { margin: 0 0 .6rem; padding-left: 1.05rem; display: grid; gap: .35rem; }
.facnote__meta { margin: .35rem 0 0; color: rgba(255,255,255,.75); }
.facnote__meta b { color: var(--vu-gold-flat); font-weight: 600; }
.facnote__core { border-top: 1px dashed rgba(207,174,112,.35); padding-top: .5rem; }
</style>
'''
s = s.replace('</head>', FAC_CSS + '</head>')

# ---- 7. footer marker ----
s = s.replace('AI Basics · A Vanderbilt learning experience',
              'AI Basics · Facilitator Edition · learner link: <a href="' + LEARNER_URL + '" style="color:rgba(255,255,255,.7);text-decoration:underline">me5231979.github.io/AI_Classroom</a>')

out = os.path.join(ROOT, 'facilitator', 'index.html')
open(out, 'w').write(s)
print(f'wrote {out}: {count} notes rails injected')
