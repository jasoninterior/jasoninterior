(function () {
  'use strict';

  var PROJECTS = window.PROJECTS || [];
  var app = document.getElementById('app');
  var EMAIL = 'jasonchoe.cjs@gmail.com';
  /* 문의 폼 전송 서비스(FormSubmit). 첫 전송 때 EMAIL로 오는 활성화 메일의 버튼을 한 번 눌러야 합니다. */
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL;

  /* ---------- 분류 ---------- */
  var CATS = [
    { id: 'medical',     en: 'Medical',     ko: '의료 공간',   desc: '진료 동선, 상담 프라이버시, 조명 및 운영 환경.' },
    { id: 'office',      en: 'Office',      ko: '업무 공간',   desc: '업무 방식에 맞춘 회의·집중 공간의 구획과 동선.' },
    { id: 'commercial',  en: 'Commercial',  ko: '상업 공간',   desc: '브랜드 경험과 고객 동선, 공간 아이덴티티.' },
    { id: 'residential', en: 'Residential', ko: '주거 공간',   desc: '생활 방식과 소재, 수납 및 공간의 균형.' },
    { id: 'public',      en: 'Public',      ko: '전시 · 공공', desc: '관람 동선과 전시 구조물, 설치 일정.' }
  ];
  function cat(id) { return CATS.filter(function (c) { return c.id === id; })[0]; }
  function inCat(id) { return PROJECTS.filter(function (p) { return p.cat === id; }); }
  function project(id) { return PROJECTS.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- 저널 (v03 내용) ---------- */
  var ARTICLES = [
    { id: 'flow', title: '환자와 직원의 동선을 설계하는 방법', text: '의료 공간에서는 대기, 상담, 진료, 직원 이동의 접점을 먼저 파악합니다. 동선의 교차와 프라이버시를 검토하고 운영 방식에 맞춰 배치합니다.' },
    { id: 'light', title: '빛이 공간의 인상을 결정하는 방식', text: '조명은 분위기뿐 아니라 업무와 관찰의 조건을 만듭니다. 용도별 조도와 눈부심, 색 표현을 함께 검토합니다.' },
    { id: 'material', title: '마감재를 선택하는 기준', text: '소재의 질감과 색뿐 아니라 청소, 내구성, 유지관리 조건을 함께 고려합니다.' }
  ];
  /* 진행 단계 · 계약 */
  var NO_PRECONTRACT_UNTIL = '2027년 5월';
  var STEPS = [
    { t: '상담', d: '현장과 필요한 조건을 확인합니다. 보통 이 단계에서 가계약을 하지만, ' + NO_PRECONTRACT_UNTIL + '까지는 가계약 없이 진행합니다.', tag: '가계약 없음' },
    { t: '공간 기획 · 견적 제안', d: '공간 구성안과 공사 범위, 견적, 일정을 제안합니다.', tag: '가계약 없음' },
    { t: '본계약', d: '제안 내용에 동의하시면 계약합니다. 공사 범위, 금액, 일정, 하자 대응 조건을 계약서에 적습니다.', tag: 'Contract' },
    { t: '시공 · 품질 확인', d: '계약한 내용대로 시공하고, 마감 품질을 함께 확인합니다.', tag: '' }
  ];

  /* ---------- 조각 ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* 작업 id와 사진 순번으로 사진 찾기 */
  function photo(id, n) {
    var p = project(id);
    return p ? p.photos[Math.min(n || 0, p.photos.length - 1)] : null;
  }
  function visual(ph, alt, eager) {
    if (!ph) return '<div class="visual"></div>';
    return '<div class="visual"><img src="' + ph.src + '" alt="' + esc(alt || '') + '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></div>';
  }
  /* 사진 전면 패널 */
  function panel(o) {
    var tag = o.href ? 'a' : 'section';
    var H = o.h1 ? 'h1' : 'h2';
    return '<' + tag + ' class="panel ' + (o.cls || '') + '"' + (o.href ? ' href="' + o.href + '"' : '') + '>' +
      visual(o.photo, o.alt || o.title, o.eager) +
      '<div class="overlay">' +
        '<span class="label">' + o.tag + '</span>' +
        '<' + H + '>' + o.title + '</' + H + '>' +
        (o.desc ? '<p>' + o.desc + '</p>' : '') +
        (o.link ? (o.linkHref ? '<a class="link" href="' + o.linkHref + '">' + o.link + ' ↗</a>' : '<span class="link">' + o.link + ' ↗</span>') : '') +
      '</div>' +
      (o.count ? '<span class="count">' + o.count + '</span>' : '') +
    '</' + tag + '>';
  }
  function catPanel(id, n, pid, pn) {
    var c = cat(id);
    return panel({
      href: '#works/' + id,
      photo: photo(pid, pn),
      tag: pad(n) + ' / ' + c.en,
      title: c.en + ' spaces.',
      desc: c.ko,
      link: 'View works',
      count: pad(inCat(id).length) + ' Projects'
    });
  }
  function cta() {
    return panel({
      href: '#contact', cls: 'short',
      photo: photo('lipim', 0),
      tag: 'Next project',
      title: 'Let’s build your space.',
      desc: '당신의 다음 공간을 함께 설계합니다.',
      link: 'Project inquiry'
    });
  }
  function intro(tag, title, desc, ph) {
    return panel({ cls: 'intro', h1: true, photo: ph, tag: tag, title: title, desc: desc, eager: true });
  }
  function tile(p) {
    var c = cat(p.cat);
    var i = PROJECTS.indexOf(p) + 1;
    return '<a class="panel" href="#project/' + p.id + '">' +
      visual(p.photos[0], p.name) +
      '<div class="overlay">' +
        '<span class="label">' + pad(i) + ' / ' + c.en + (p.year ? ' · ' + p.year : '') + '</span>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<span class="link">View project ↗</span>' +
      '</div></a>';
  }

  /* ---------- 페이지 ---------- */
  function home() {
    return panel({
        cls: 'hero', h1: true, eager: true,
        photo: photo('vivo', 0),
        tag: 'Jason Interior / Design Studio',
        title: 'Detail builds space.',
        desc: '디테일이 공간을 만든다.',
        link: 'Explore works', linkHref: '#works'
      }) +
      '<div class="pair">' + catPanel('medical', 1, 'lua-songdo', 0) + catPanel('office', 2, 'vivo', 3) + '</div>' +
      catPanel('commercial', 3, 'doubletree', 0) +
      '<div class="pair">' + catPanel('residential', 4, 'dongsung', 0) + catPanel('public', 5, 'pulmuone', 0) + '</div>' +
      panel({
        href: '#about', cls: 'short',
        photo: photo('seoyul', 4),
        tag: '06 / Studio',
        title: 'Precision. Reduction. Clarity.',
        desc: '정확함 · 덜어냄 · 명확함',
        link: 'About studio'
      }) +
      cta();
  }

  function works(filter) {
    var active = cat(filter) ? filter : 'all';
    var list = active === 'all' ? PROJECTS : inCat(active);
    var buttons = [{ id: 'all', en: 'All' }].concat(CATS).map(function (c) {
      var n = c.id === 'all' ? PROJECTS.length : inCat(c.id).length;
      return '<button type="button" data-filter="' + c.id + '" class="' + (c.id === active ? 'is-active' : '') +
        '" aria-pressed="' + (c.id === active) + '">' + c.en + '<sup>' + pad(n) + '</sup></button>';
    }).join('');
    return intro('01 — Works', 'Selected works.', '공간 유형별로 정리한 제이슨 인테리어의 작업입니다.', photo('ida', 0)) +
      '<div class="filters" id="filters" role="group" aria-label="작업 분류">' + buttons + '</div>' +
      '<div class="grid" id="worksgrid">' + list.map(tile).join('') + '</div>' +
      cta();
  }

  /* 사진 비율에 맞춰 줄을 나누는 갤러리 */
  function gallery(p) {
    var ph = p.photos.slice(1), rows = [], i = 0, r = 0;
    function land(x) { return x.w >= x.h; }
    while (i < ph.length) {
      var left = ph.length - i;
      if (left === 1 || (land(ph[i]) && r % 3 === 0)) {
        rows.push([ph[i]]); i += 1;
      } else if (left >= 3 && !land(ph[i]) && !land(ph[i + 1]) && !land(ph[i + 2])) {
        rows.push(ph.slice(i, i + 3)); i += 3;
      } else {
        rows.push(ph.slice(i, i + 2)); i += 2;
      }
      r += 1;
    }
    return '<div class="gallery">' + rows.map(function (row) {
      var cls = row.length === 1 ? (land(row[0]) ? ' solo' : ' solo-portrait') : '';
      return '<div class="g-row' + cls + '">' + row.map(function (x) {
        var ratio = (x.w / x.h).toFixed(4);
        return '<figure style="flex:' + ratio + ' 1 0;aspect-ratio:' + ratio + '"><img src="' + x.src +
          '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" width="' + x.w + '" height="' + x.h + '"></figure>';
      }).join('') + '</div>';
    }).join('') + '</div>';
  }

  function projectPage(id) {
    var p = project(id) || PROJECTS[0];
    var c = cat(p.cat);
    var i = PROJECTS.indexOf(p);
    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(i + 1) % PROJECTS.length];
    return intro(c.en + ' / ' + esc(p.kind), esc(p.name), '', p.photos[0]) +
      '<dl class="spec">' +
        '<div><dt class="label">Category</dt><dd>' + c.ko + '</dd></div>' +
        '<div><dt class="label">Type</dt><dd>' + esc(p.kind) + '</dd></div>' +
        '<div><dt class="label">Year</dt><dd>' + (p.year || '—') + '</dd></div>' +
        '<div><dt class="label">Photos</dt><dd>' + pad(p.photos.length) + '</dd></div>' +
      '</dl>' +
      gallery(p) +
      '<nav class="pager" aria-label="다른 작업">' +
        '<a href="#project/' + prev.id + '"><span class="label">← Prev</span><span class="t-xl">' + esc(prev.name) + '</span></a>' +
        '<a href="#project/' + next.id + '"><span class="label">Next →</span><span class="t-xl">' + esc(next.name) + '</span></a>' +
      '</nav>' +
      cta();
  }

  function about() {
    var rules = [
      ['01', '정확함', 'Precision', '측정과 검토를 바탕으로 설계합니다. 모든 선과 간격은 의도된 값으로 결정합니다.'],
      ['02', '덜어냄', 'Reduction', '필요한 요소에 집중합니다. 더할 이유가 없다면 더하지 않습니다.'],
      ['03', '명확함', 'Clarity', '공간과 과정의 기준을 명확하게 전달합니다.']
    ];
    return intro('02 — About', 'Detail builds space.', '본질과 디테일에 집중하는 디자인 스튜디오.', photo('misochaeum', 0)) +
      '<section class="block"><span class="label">Principles — 세 가지 원칙</span><div class="cols">' +
        rules.map(function (a) {
          return '<div><span class="num">' + a[0] + '</span><h3 class="t-xl">' + a[1] + '</h3><span class="label">' + a[2] + '</span><p class="body">' + a[3] + '</p></div>';
        }).join('') +
      '</div></section>' +
      '<section class="block"><div class="split">' +
        '<h2 class="display d-3xl">디테일이<br>공간을 만든다.</h2>' +
        '<div><p class="lede">손이 닿는 곳, 시선이 머무는 곳, 재료와 재료가 만나는 곳. 디테일이 필요한 자리를 먼저 찾고 그 밖의 것은 덜어냅니다.</p>' +
        '<p class="note">지금까지 ' + PROJECTS.length + '개 작업의 사진을 이 사이트에 정리했습니다.</p>' +
        '<p class="back"><a class="link" href="#works">Explore works ↗</a></p></div>' +
      '</div></section>' +
      cta();
  }

  function service() {
    return intro('03 — Service', 'From concept to space.', '설계부터 시공 및 인수까지, 프로젝트 범위를 함께 정의합니다.', photo('nsn', 0)) +
      '<section class="block"><span class="label">Fields — 공간 유형</span><div class="cols five">' +
        CATS.map(function (c, i) {
          return '<div><span class="num">' + pad(i + 1) + '</span><h3 class="t-xl">' + c.ko + '</h3><span class="label">' + c.en + '</span><p class="body">' + c.desc + '</p></div>';
        }).join('') +
      '</div></section>' +
      '<section class="block"><h2 class="display d-3xl">Process &amp; contract.</h2>' +
        '<p class="body lead">인테리어 계약은 보통 두 번에 나누어 맺습니다. 상담을 시작할 때 가계약을 하고, 공간 기획과 견적 제안을 받은 뒤 본계약을 합니다.</p>' +
        '<div class="notice"><span class="label">Until May 2027</span>' +
          '<p class="t-xl">' + NO_PRECONTRACT_UNTIL + '까지는 가계약 없이 상담과 견적을 진행합니다.</p>' +
          '<p class="body">견적 제안을 받아본 뒤 본계약 여부를 결정하시면 됩니다.</p></div>' +
        STEPS.map(function (s, i) {
          return '<div class="rule step"><span class="label">Step ' + pad(i + 1) + '</span><div><h3 class="t-xl">' + s.t + '</h3><p class="body">' + s.d + '</p></div><span class="label">' + s.tag + '</span></div>';
        }).join('') +
      '</section>' +
      cta();
  }

  function journal() {
    return intro('04 — Journal', 'Notes on space.', '디자인과 공간 운영에 대한 인사이트.', photo('hopyeong', 0)) +
      '<section class="block">' +
        ARTICLES.map(function (a, i) {
          return '<a class="rule" href="#article/' + a.id + '"><span class="label">Insight ' + pad(i + 1) + '</span><h3 class="t-xl">' + a.title + '</h3><span class="label">Read ↗</span></a>';
        }).join('') +
      '</section>';
  }

  function article(id) {
    var a = ARTICLES.filter(function (x) { return x.id === id; })[0] || ARTICLES[0];
    return intro('Journal / Insight', a.title, '', photo('lua-songdo', 4)) +
      '<section class="block"><div class="split"><span class="label">Insight · Design</span>' +
      '<div><p class="lede">' + a.text + '</p><p class="back"><a class="link" href="#journal">← Journal</a></p></div></div></section>' +
      cta();
  }

  function contact() {
    return intro('05 — Contact', 'Let’s build your space.', '프로젝트의 시작을 알려주세요.', photo('lipim', 0)) +
      '<section class="block"><div class="split">' +
        '<div><h2 class="display d-3xl">Project inquiry.</h2>' +
          '<p class="body">상담을 위한 기본 정보를 입력해주세요.</p>' +
          '<dl class="contact-info"><div><dt class="label">Email</dt><dd><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></dd></div></dl>' +
        '</div>' +
        '<form class="form" id="inquiry" novalidate>' +
          '<div class="field"><label class="label" for="f-name">Name · Required</label><input id="f-name" name="name" required placeholder="성함 / 회사명" autocomplete="name"></div>' +
          '<div class="field"><label class="label" for="f-contact">Contact · Required</label><input id="f-contact" name="contact" required placeholder="연락처 또는 이메일"></div>' +
          '<div class="field"><label class="label" for="f-type">Project type</label><select id="f-type" name="type">' +
            CATS.map(function (c) { return '<option>' + c.ko + '</option>'; }).join('') + '</select></div>' +
          '<div class="field"><label class="label" for="f-area">Location / Area</label><input id="f-area" name="area" placeholder="지역 / 평수 (선택)"></div>' +
          '<div class="field full"><label class="label" for="f-msg">Message</label><textarea id="f-msg" name="message" placeholder="희망 일정, 예산, 요청사항 (선택)"></textarea>' +
            '<span class="hint" id="status" role="status">보내기를 누르면 문의 내용이 메일로 전달됩니다.</span>' +
            '<input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0"></div>' +
          '<div class="form-foot"><span></span><button class="btn" type="submit">Send inquiry ↗</button></div>' +
        '</form>' +
      '</div></section>';
  }

  /* ---------- 라우터 ---------- */
  function render() {
    var parts = (location.hash.slice(1) || 'home').split('/');
    var page = parts[0], id = parts[1];
    var html;
    if (page === 'works') html = works(id);
    else if (page === 'project') html = projectPage(id);
    else if (page === 'about') html = about();
    else if (page === 'service') html = service();
    else if (page === 'journal') html = journal();
    else if (page === 'article') html = article(id);
    else if (page === 'contact') html = contact();
    else { page = 'home'; html = home(); }

    app.innerHTML = html;
    app.style.animation = 'none'; void app.offsetWidth; app.style.animation = '';
    window.scrollTo(0, 0);

    var navPage = page === 'project' ? 'works' : page === 'article' ? 'journal' : page;
    document.querySelectorAll('#nav a').forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.page === navPage);
    });
    var p = page === 'project' && project(id);
    document.title = (p ? p.name + ' — ' : '') + 'JASON INTERIOR';
  }

  /* 필터: 페이지를 다시 그리지 않고 목록만 교체 */
  app.addEventListener('click', function (e) {
    var btn = e.target.closest('#filters button');
    if (!btn) return;
    var f = btn.dataset.filter;
    document.querySelectorAll('#filters button').forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    document.getElementById('worksgrid').innerHTML = (f === 'all' ? PROJECTS : inCat(f)).map(tile).join('');
    history.replaceState(null, '', f === 'all' ? '#works' : '#works/' + f);
  });

  /* 문의 폼 → 메일 앱 */
  app.addEventListener('submit', function (e) {
    if (e.target.id !== 'inquiry') return;
    e.preventDefault();
    var f = e.target, d = new FormData(f), status = document.getElementById('status');
    var name = (d.get('name') || '').trim(), who = (d.get('contact') || '').trim();
    if (!name || !who) {
      status.textContent = '성함과 연락처는 필수 항목입니다.';
      status.style.color = '#fff';
      (name ? f.elements.contact : f.elements.name).focus();
      return;
    }
    var body = ['성함/회사명: ' + name, '연락처: ' + who, '공간 유형: ' + d.get('type'),
      '지역/평수: ' + (d.get('area') || '-'), '', d.get('message') || ''].join('\n');
    var subject = '[문의] ' + name + ' · ' + d.get('type');
    var mailto = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    if (d.get('_honey')) return; /* 스팸 봇 */

    var btn = f.querySelector('button[type=submit]'), btnText = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';
    status.style.color = '';
    status.textContent = '전송 중입니다.';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: subject, _template: 'table', _captcha: 'false',
        '성함/회사명': name, '연락처': who, '공간 유형': d.get('type'),
        '지역/평수': d.get('area') || '-', '내용': d.get('message') || '-'
      })
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || String(res.j.success) !== 'true') throw new Error(res.j.message || 'failed');
        f.reset();
        status.style.color = '#fff';
        status.textContent = '문의가 접수되었습니다. 확인 후 연락드리겠습니다.';
      })
      .catch(function () {
        status.style.color = '#fff';
        status.innerHTML = '전송하지 못했습니다. <a href="' + mailto.replace(/"/g, '%22') + '" style="text-decoration:underline">메일 앱으로 보내기</a> 또는 ' + EMAIL + ' 로 직접 보내주세요.';
      })
      .then(function () { btn.disabled = false; btn.textContent = btnText; });
  });

  window.addEventListener('hashchange', render);
  render();
})();
