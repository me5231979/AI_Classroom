/* =====================================================================
   AI BASICS — classroom deck interactions (vanilla JS, no dependencies)
   ===================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Nav: scroll state, mobile toggle, active link ---------- */
  var nav = $('.nav');
  var toggle = $('.nav__toggle');
  var links = $('.nav__links');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revEls.forEach(function (el) { revObs.observe(el); });
  } else {
    revEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Manifesto word-by-word reveal ---------- */
  $$('.manifesto p').forEach(function (p) {
    var words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
  });
  if ('IntersectionObserver' in window && !reduce) {
    var wObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var ws = $$('.w', e.target);
        ws.forEach(function (w, i) { setTimeout(function () { w.classList.add('lit'); }, i * 55); });
        wObs.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    $$('.manifesto').forEach(function (m) { wObs.observe(m); });
  }

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1100, start = null;
    if (reduce) { el.textContent = target + suffix; return; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cObs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    $$('[data-count-to]').forEach(function (el) { cObs.observe(el); });
  } else { $$('[data-count-to]').forEach(function (el) { el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-suffix') || ''); }); }

  /* ---------- Hero ambient particles ---------- */
  var canvas = $('.hero__canvas');
  if (canvas && !reduce && !isTouch) {
    var ctx = canvas.getContext('2d');
    var W, H, parts = [];
    function size() {
      W = canvas.width = canvas.offsetWidth * (window.devicePixelRatio > 1 ? 2 : 1);
      H = canvas.height = canvas.offsetHeight * (window.devicePixelRatio > 1 ? 2 : 1);
    }
    size(); window.addEventListener('resize', size);
    for (var i = 0; i < 46; i++) {
      parts.push({ x: Math.random() * 1, y: Math.random() * 1, r: Math.random() * 1.6 + 0.4,
        vy: (Math.random() * 0.00018 + 0.00006), vx: (Math.random() - 0.5) * 0.00008,
        a: Math.random() * 0.5 + 0.2 });
    }
    (function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.x += p.vx;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * (window.devicePixelRatio > 1 ? 2 : 1), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(207,174,112,' + p.a + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    })();
  } else if (canvas) { canvas.style.display = 'none'; }

  /* ---------- INTERACTIVE: AI/ML/DL rings ---------- */
  var ringData = {
    ai:  { tag: 'The whole field', h: 'Artificial Intelligence', p: 'Any technique that lets machines mimic human-like tasks — reasoning, perception, decision-making. Includes rule-based systems that never "learn."' },
    ml:  { tag: 'A subset of AI', h: 'Machine Learning', p: 'Systems that improve at a task by finding patterns in data, rather than being explicitly programmed with rules. Learns from examples.' },
    dl:  { tag: 'A subset of ML', h: 'Deep Learning', p: 'Machine learning using many-layered neural networks. Powers image recognition, speech, and modern language models.' },
    gen: { tag: 'A use of deep learning', h: 'Generative AI', p: 'Deep-learning models that create new content — text, images, code, audio — by predicting what plausibly comes next. ChatGPT lives here.' }
  };
  var ringDetail = $('#ringDetail');
  var rings = $$('.ring');
  function showRing(key) {
    rings.forEach(function (r) {
      var k = r.getAttribute('data-ring');
      r.classList.toggle('active', k === key);
      r.classList.toggle('dim', key !== null && k !== key);
      r.setAttribute('aria-pressed', String(k === key));
    });
    if (ringDetail && ringData[key]) {
      var d = ringData[key];
      ringDetail.innerHTML = '<span class="tag">' + d.tag + '</span><h3>' + d.h + '</h3><p>' + d.p + '</p>';
    }
  }
  rings.forEach(function (r) {
    r.setAttribute('tabindex', '0');
    r.setAttribute('role', 'button');
    var k = r.getAttribute('data-ring');
    r.addEventListener('click', function () { showRing(k); });
    r.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showRing(k); }
    });
  });

  /* ---------- INTERACTIVE: neural network ---------- */
  var nn = $('#nn');
  if (nn) {
    var svg = $('svg', nn), status = $('#nnStatus');
    var layers = [4, 6, 5, 2];
    var colGap = 180, rowGap = 44, left = 46, r = 13;
    var coords = [];
    var ns = 'http://www.w3.org/2000/svg';
    var vbH = 320, vbW = 640;
    // build coordinates
    layers.forEach(function (n, li) {
      var arr = [], colY = (vbH - (n - 1) * rowGap) / 2;
      for (var i = 0; i < n; i++) arr.push({ x: left + li * colGap, y: colY + i * rowGap });
      coords.push(arr);
    });
    // edges
    for (var l = 0; l < coords.length - 1; l++) {
      coords[l].forEach(function (a) {
        coords[l + 1].forEach(function (b) {
          var ln = document.createElementNS(ns, 'line');
          ln.setAttribute('x1', a.x); ln.setAttribute('y1', a.y);
          ln.setAttribute('x2', b.x); ln.setAttribute('y2', b.y);
          ln.setAttribute('class', 'edge'); ln.setAttribute('data-layer', l);
          svg.appendChild(ln);
        });
      });
    }
    // nodes + labels
    var labels = ['Input', 'Hidden', 'Hidden', 'Output'];
    coords.forEach(function (arr, li) {
      arr.forEach(function (c) {
        var cir = document.createElementNS(ns, 'circle');
        cir.setAttribute('cx', c.x); cir.setAttribute('cy', c.y); cir.setAttribute('r', r);
        cir.setAttribute('class', 'node'); cir.setAttribute('data-layer', li);
        svg.appendChild(cir);
      });
      var t = document.createElementNS(ns, 'text');
      t.setAttribute('x', arr[0].x); t.setAttribute('y', vbH - 6);
      t.setAttribute('text-anchor', 'middle'); t.setAttribute('class', 'layerlbl');
      t.textContent = labels[li];
      svg.appendChild(t);
    });
    svg.setAttribute('viewBox', '0 0 ' + vbW + ' ' + vbH);
    var lit = -1, running = false;
    function litLayer(i) {
      $$('.node', svg).forEach(function (n) { n.classList.toggle('lit', +n.getAttribute('data-layer') === i); });
      $$('.edge', svg).forEach(function (e) { e.classList.toggle('lit', +e.getAttribute('data-layer') === i); });
    }
    function forward() {
      if (running) return; running = true;
      var names = ['Signal enters the input layer', 'Hidden layer 1 finds simple patterns',
        'Hidden layer 2 combines them', 'Output layer makes a prediction'];
      var i = 0;
      (function tick() {
        if (i >= layers.length) {
          running = false; status.textContent = 'Prediction ready — press again';
          setTimeout(function () { litLayer(-1); }, 700); return;
        }
        litLayer(i); status.textContent = names[i]; i++;
        setTimeout(tick, reduce ? 300 : 850);
      })();
    }
    $('#nnRun').addEventListener('click', forward);
  }

  /* ---------- INTERACTIVE: next-token predictor ---------- */
  var predict = $('#predict');
  if (predict) {
    var sentEl = $('#predictSentence'), optEl = $('#predictOptions'), hintEl = $('#predictHint');
    var chain = {
      start: { words: 'The best way to learn is to', next: 'a' },
      a: { options: [['practice', 62], ['study', 21], ['sleep', 9], ['banana', 1]], pick: 'practice', next: 'b' },
      b: { options: [['every', 47], ['a', 28], ['consistently', 19], ['loudly', 2]], pick: 'every', next: 'c' },
      c: { options: [['day', 71], ['week', 16], ['moment', 10], ['pizza', 1]], pick: 'day', next: null }
    };
    var built = 'The best way to learn is to';
    var state = 'a';
    function renderOptions() {
      if (!state || !chain[state]) {
        optEl.innerHTML = '';
        hintEl.textContent = 'That is all a language model does — pick the next token, over and over, blindingly fast.';
        sentEl.innerHTML = built + ' <span class="cursor">▮</span>';
        return;
      }
      var node = chain[state];
      sentEl.innerHTML = built + ' <span class="cursor">▮</span>';
      optEl.innerHTML = '';
      node.options.forEach(function (o) {
        var b = document.createElement('button');
        b.className = 'tok';
        b.innerHTML = '<span class="bar" style="width:' + o[1] + '%"></span>' +
          '<span class="word">' + o[0] + '</span><span class="pct">' + o[1] + '%</span>';
        b.addEventListener('click', function () {
          built += ' ' + o[0];
          state = node.next;
          renderOptions();
        });
        optEl.appendChild(b);
      });
      hintEl.textContent = 'Pick a word. The model assigns every option a probability — higher bar = more likely.';
    }
    $('#predictReset').addEventListener('click', function () {
      built = 'The best way to learn is to'; state = 'a'; renderOptions();
    });
    renderOptions();
  }

  /* ---------- INTERACTIVE: temperature ---------- */
  var temp = $('#temp');
  if (temp) {
    var tSlider = $('#tempSlider'), tOut = $('#tempReadout'), tVal = $('#tempVal');
    var samples = [
      { max: 15, label: '0.0 · Deterministic', text: 'The sky is blue because molecules scatter shorter blue wavelengths of sunlight more than longer red ones.' },
      { max: 45, label: '0.4 · Focused', text: 'The sky appears blue because tiny air molecules scatter the sun’s blue light in every direction.' },
      { max: 75, label: '0.8 · Balanced', text: 'Sunlight is a mix of colors, and our restless atmosphere flings the blue portion across the whole dome above us.' },
      { max: 101, label: '1.2 · Creative', text: 'Picture sunlight shattering against the air like glass — the blue shards scatter farthest, painting the ceiling of the world.' }
    ];
    function updTemp() {
      var v = +tSlider.value;
      var s = samples.find(function (x) { return v < x.max; }) || samples[samples.length - 1];
      tOut.textContent = s.text;
      tVal.textContent = s.label;
    }
    tSlider.addEventListener('input', updTemp);
    updTemp();
  }

  /* ---------- INTERACTIVE: prompt anatomy ---------- */
  var pa = $('#promptAnatomy');
  if (pa) {
    var colors = { role: '#B3C9CD', context: '#8BA18E', task: '#CFAE70', format: '#ECB748' };
    $$('.pkey button', pa).forEach(function (btn) {
      var part = btn.getAttribute('data-target');
      function set(on) {
        $$('.ppart[data-part="' + part + '"]', pa).forEach(function (span) {
          span.classList.toggle('on', on);
          span.style.background = on ? colors[part] : '';
        });
        btn.classList.toggle('active', on);
      }
      btn.addEventListener('mouseenter', function () { set(true); });
      btn.addEventListener('mouseleave', function () { if (!btn.dataset.stick) set(false); });
      btn.addEventListener('focus', function () { set(true); });
      btn.addEventListener('blur', function () { if (!btn.dataset.stick) set(false); });
      btn.addEventListener('click', function () {
        var stick = btn.dataset.stick === '1';
        btn.dataset.stick = stick ? '' : '1';
        set(!stick);
      });
    });
  }

  /* ---------- INTERACTIVE: knowledge check quizzes ---------- */
  $$('[data-quiz]').forEach(function (root) {
    var qEls = $$('.quiz__q', root);
    // single-question checks: each .opt has data-correct
    $$('.quiz__options', root).forEach(function (group) {
      var answered = false;
      var fb = group.parentElement.querySelector('.quiz__feedback');
      $$('.opt', group).forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (answered) return; answered = true;
          var correct = opt.getAttribute('data-correct') === '1';
          $$('.opt', group).forEach(function (o) {
            o.setAttribute('disabled', 'true');
            if (o.getAttribute('data-correct') === '1') o.classList.add('correct');
          });
          if (!correct) opt.classList.add('wrong');
          if (fb) {
            fb.classList.add('show');
            fb.textContent = (correct ? '✓ Correct. ' : '✗ Not quite. ') + (opt.getAttribute('data-why') || '');
            fb.style.color = correct ? 'var(--vu-oak)' : '#c76b5a';
          }
        });
      });
    });
  });

  /* ---------- INTERACTIVE: scored recap quiz ---------- */
  var recap = $('#recap');
  if (recap) {
    var QUESTIONS = [
      { q: 'Which statement best describes machine learning?',
        opts: ['A computer following hand-written rules', 'A system that finds patterns from data instead of explicit rules', 'A faster kind of database', 'A robot with sensors'],
        correct: 1, why: 'ML learns patterns from examples rather than being told every rule.' },
      { q: 'A large language model generates text by…',
        opts: ['Looking answers up in a fixed table', 'Predicting the next token one step at a time', 'Copying the closest webpage', 'Running a spell-checker'],
        correct: 1, why: 'LLMs repeatedly predict the most plausible next token.' },
      { q: 'Raising the "temperature" of a model makes its output…',
        opts: ['More random and creative', 'More accurate and factual', 'Faster to compute', 'Shorter'],
        correct: 0, why: 'Higher temperature = more randomness/variety; lower = more focused.' },
      { q: 'A "hallucination" in AI refers to…',
        opts: ['A rendering bug', 'Confident output that is factually wrong', 'A privacy breach', 'Slow response time'],
        correct: 1, why: 'Models can state false information fluently and confidently.' },
      { q: 'The most reliable way to improve an AI’s answer is to…',
        opts: ['Ask louder', 'Give clear context, task, and desired format', 'Use more emojis', 'Repeat the same prompt'],
        correct: 1, why: 'Structured prompts (role, context, task, format) drive better results.' }
    ];
    var idx = 0, score = 0, locked = false;
    var qEl = $('#recapQ'), optEl2 = $('#recapOptions'), fbEl = $('#recapFeedback'),
        progEl = $('#recapProgress'), nextBtn = $('#recapNext'), panelEl = $('#recapPanel'), resultEl = $('#recapResult');
    function render() {
      locked = false;
      var Q = QUESTIONS[idx];
      qEl.textContent = Q.q;
      progEl.textContent = 'Question ' + (idx + 1) + ' of ' + QUESTIONS.length;
      fbEl.textContent = ''; fbEl.classList.remove('show');
      nextBtn.style.visibility = 'hidden';
      nextBtn.textContent = idx === QUESTIONS.length - 1 ? 'See score' : 'Next question';
      optEl2.innerHTML = '';
      Q.opts.forEach(function (text, i) {
        var b = document.createElement('button');
        b.className = 'opt';
        b.innerHTML = '<span class="mark">' + String.fromCharCode(65 + i) + '</span><span>' + text + '</span>';
        b.addEventListener('click', function () {
          if (locked) return; locked = true;
          var right = i === Q.correct;
          if (right) score++;
          $$('.opt', optEl2).forEach(function (o, oi) {
            o.setAttribute('disabled', 'true');
            if (oi === Q.correct) o.classList.add('correct');
          });
          if (!right) b.classList.add('wrong');
          fbEl.classList.add('show');
          fbEl.textContent = (right ? '✓ Correct. ' : '✗ ') + Q.why;
          fbEl.style.color = right ? 'var(--vu-oak)' : '#c76b5a';
          nextBtn.style.visibility = 'visible';
        });
        optEl2.appendChild(b);
      });
    }
    nextBtn.addEventListener('click', function () {
      idx++;
      if (idx >= QUESTIONS.length) { showResult(); }
      else render();
    });
    function showResult() {
      panelEl.hidden = true;
      resultEl.hidden = false;
      var pct = Math.round((score / QUESTIONS.length) * 100);
      var msg = pct >= 80 ? 'You’ve got the fundamentals down.' :
                pct >= 50 ? 'Solid start — revisit the sections you missed.' :
                            'Worth another pass through the deck.';
      resultEl.innerHTML = '<span class="eyebrow">Your result</span>' +
        '<div class="quiz__score gold-text">' + score + ' / ' + QUESTIONS.length + '</div>' +
        '<p class="lead" style="margin-top:1rem">' + msg + '</p>' +
        '<button class="btn btn--dark" id="recapRetry" style="margin-top:1.5rem">Try again</button>';
      $('#recapRetry').addEventListener('click', function () {
        idx = 0; score = 0; resultEl.hidden = true; panelEl.hidden = false; render();
      });
    }
    render();
  }

  /* ---------- INTERACTIVE: glossary flip ---------- */
  $$('.flip').forEach(function (card) {
    card.addEventListener('click', function () { card.classList.toggle('flipped'); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    });
  });

  /* ---------- Deck navigation: dots, arrows, keyboard, progress ---------- */
  var slides = $$('.slide');
  var dotWrap = $('#dots');
  var bar = $('#progressBar');
  var counter = $('#deckCount');
  var current = 0;

  // build dots
  if (dotWrap) {
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      var label = s.getAttribute('data-title') || ('Section ' + (i + 1));
      b.setAttribute('aria-label', 'Go to: ' + label);
      b.addEventListener('click', function () { goTo(i); });
      dotWrap.appendChild(b);
    });
  }
  var dots = dotWrap ? $$('button', dotWrap) : [];

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  function setActive(i) {
    current = i;
    dots.forEach(function (d, di) { d.setAttribute('aria-current', String(di === i)); });
    if (counter) counter.textContent = (i + 1) + ' / ' + slides.length;
    $$('.nav__links a').forEach(function (a) {
      var href = a.getAttribute('href');
      a.setAttribute('aria-current', String(href === '#' + slides[i].id));
    });
  }
  if ('IntersectionObserver' in window) {
    var sObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { setActive(slides.indexOf(e.target)); }
      });
    }, { threshold: 0.5 });
    slides.forEach(function (s) { sObs.observe(s); });
  }
  setActive(0);

  // progress bar
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });

  // keyboard
  document.addEventListener('keydown', function (e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(document.activeElement.tagName) > -1) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      e.preventDefault(); goTo(current + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      e.preventDefault(); goTo(current - 1);
    } else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
  });

  // deck bar buttons
  var prevB = $('#deckPrev'), nextB = $('#deckNext');
  if (prevB) prevB.addEventListener('click', function () { goTo(current - 1); });
  if (nextB) nextB.addEventListener('click', function () { goTo(current + 1); });

  // year
  var yEl = $('#year'); if (yEl) yEl.textContent = new Date().getFullYear();
})();
