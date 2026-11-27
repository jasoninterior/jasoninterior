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
    { id: 'flow', title: '환자와 직원의 동선을 설계하는 방법', en: 'Designing the Flow of Space.', body: [
      '의료 공간의 설계에서 동선은 운영의 효율성과 사용자의 편의성을 결정하는 기본적인 요소입니다. 환자의 이동은 직관적이어야 하며, 의료진의 반복적인 움직임은 최소화되어야 합니다.',
      '그러나 디자이너에게 동선은 단순히 이동 거리의 문제가 아닙니다. 공간에 진입하는 순간부터 머무르고 이동하며 경험하게 되는 시선의 변화, 공간의 개방감과 심리적 안정까지 고려해야 하는 설계의 영역입니다.',
      '예를 들어 접수 공간은 진입과 동시에 인지할 수 있도록 배치하고, 대기 공간은 주요 이동 경로에서 벗어나도록 계획합니다. 의료진의 업무 동선은 자주 사용하는 공간을 중심으로 압축하며, 상담실은 출입구의 방향과 벽체의 구성을 통해 시각적·청각적 프라이버시를 확보합니다.',
      '이 과정에서 벽체의 배치, 천장의 높이, 조명의 방향, 바닥재의 변화는 공간을 자연스럽게 인지하도록 돕는 건축적 장치가 됩니다.',
      '동선 설계는 이동의 효율성을 확보하는 동시에 공간을 경험하는 순서를 디자인하는 일입니다.'
    ] },
    { id: 'light', title: '빛이 공간의 인상을 결정하는 방식', en: 'Light Defines the Atmosphere.', body: [
      '조명의 기본적인 역할은 공간의 사용 목적에 필요한 시환경을 확보하는 것입니다. 적절한 조도와 눈부심의 제어, 색을 정확하게 인식할 수 있는 연색성은 조명 설계에서 우선적으로 고려해야 할 조건입니다.',
      '디자이너는 이러한 기능적 조건을 바탕으로 빛이 공간의 형태와 재료, 사람의 감각에 어떠한 영향을 미치는지 살펴봅니다. 공간 전체를 균일하게 밝히는 것과 필요한 부분에 빛을 배치하는 것은 서로 다른 공간적 경험을 만들어냅니다.',
      '대기 공간에서는 벽면과 천장에 반사되는 간접광을 활용해 부드러운 분위기를 형성하고, 진료 공간에서는 피부색과 상태를 정확하게 확인할 수 있도록 기능적인 조명을 별도로 계획합니다. 또한 재료의 질감을 강조할 때는 빛의 입사각을 조절하고, 공간의 깊이를 표현할 때는 밝음과 어두움의 관계를 설계합니다.',
      '조명기구의 위치를 결정하기에 앞서 무엇을 드러내고 무엇을 절제할 것인지 판단하는 것이 중요합니다.',
      '빛을 설계한다는 것은 밝기를 결정하는 것을 넘어 공간의 형태와 분위기, 시선의 방향을 결정하는 일입니다.'
    ] },
    { id: 'material', title: '마감재를 선택하는 기준', en: 'The Integrity of Materials.', body: [
      '마감재의 선택은 공간의 사용 목적과 환경에 대한 이해에서 출발합니다. 내구성, 오염 저항성, 유지관리, 시공성은 공간의 수명과 사용 편의성을 결정하는 실질적인 조건입니다.',
      '디자이너는 재료를 개별적인 색상이나 질감으로만 바라보지 않습니다. 서로 다른 재료가 만나는 관계, 빛에 반응하는 표면, 반복되는 모듈과 비례, 시간이 지나며 변화하는 물성까지 하나의 공간적 구성으로 해석합니다.',
      '예를 들어 의료 공간에서는 반복적인 세척과 소독에 적합한 마감재를 우선적으로 선정하되, 사용 환경에 따라 서로 다른 재료를 적용합니다. 진료 공간에는 관리가 용이한 비다공성 표면을, 대기 공간에는 사용 조건에 적합한 질감과 온기를 가진 재료를 계획합니다. 서로 다른 재료라도 색조와 접합부, 줄눈의 정렬을 조율하면 공간 전체의 일관성을 유지할 수 있습니다.',
      '실제 설계에서는 재료의 샘플을 조명 아래에서 비교하고, 접합 디테일과 시공 이후의 유지관리까지 검토해야 합니다.',
      '좋은 재료를 선택하는 것과 재료를 잘 다루는 것은 다릅니다. 공간의 완성도는 그 차이에서 비롯됩니다.'
    ] }
  ];
  var STEPS = ['상담 및 현장 확인', '공간 기획 및 설계', '견적 및 일정 협의', '시공 및 품질 확인', '유지관리'];

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
      '<section class="block"><h2 class="display d-3xl">Our process.</h2>' +
        STEPS.map(function (s, i) {
          return '<div class="rule"><span class="label">Step ' + pad(i + 1) + '</span><h3 class="t-xl">' + s + '</h3><span></span></div>';
        }).join('') +
        '<p class="note">공사 범위, 추가 비용, 일정 및 하자 대응 조건은 계약 전 협의합니다.</p>' +
      '</section>' +
      cta();
  }

  function journal() {
    return intro('04 — Journal', 'Notes on space.', '디자인과 공간 운영에 대한 인사이트.', photo('hopyeong', 0)) +
      '<section class="block">' +
        ARTICLES.map(function (a, i) {
          return '<a class="rule" href="#article/' + a.id + '"><span class="label">Journal ' + pad(i + 1) + '</span><div><h3 class="t-xl">' + a.title + '</h3><span class="label sub">' + a.en + '</span></div><span class="label">Read ↗</span></a>';
        }).join('') +
      '</section>';
  }

  function article(id) {
    var n = 0;
    ARTICLES.forEach(function (x, i) { if (x.id === id) n = i; });
    var a = ARTICLES[n], next = ARTICLES[(n + 1) % ARTICLES.length];
    var last = a.body.length - 1;
    return intro('Journal ' + pad(n + 1), a.title, a.en, photo('lua-songdo', 4)) +
      '<section class="block"><div class="split article"><span class="label">Journal ' + pad(n + 1) + ' · Design</span>' +
      '<div class="prose">' +
        a.body.map(function (t, i) { return '<p class="' + (i === 0 ? 'lede' : i === last ? 'closing' : 'body') + '">' + t + '</p>'; }).join('') +
        '<p class="back"><a class="link" href="#journal">← Journal</a>' +
        '<a class="link" href="#article/' + next.id + '">Next — ' + next.title + ' ↗</a></p>' +
      '</div></div></section>' +
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

    /* 접수 완료를 바로 보여주고 전송은 뒤에서 계속한다 (전송 서비스 응답이 느릴 수 있음) */
    f.reset();
    status.style.color = '#fff';
    status.textContent = '문의가 접수되었습니다. 확인 후 연락드리겠습니다.';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      keepalive: true, /* 페이지를 떠나도 전송을 이어간다 */
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: subject, _template: 'table', _captcha: 'false',
        '성함/회사명': name, '연락처': who, '공간 유형': d.get('type'),
        '지역/평수': d.get('area') || '-', '내용': d.get('message') || '-'
      })
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || String(res.j.success) !== 'true') throw new Error(res.j.message || 'failed');
      })
      .catch(function () {
        /* 실패하면 입력 내용이 담긴 메일 링크로 다시 보낼 수 있게 안내 */
        if (document.body.contains(status)) {
          status.style.color = '#fff';
          status.innerHTML = '죄송합니다. 방금 문의가 전송되지 않았습니다. <a href="' + mailto.replace(/"/g, '%22') + '" style="text-decoration:underline">메일 앱으로 보내기</a> 또는 ' + EMAIL + ' 로 직접 보내주세요.';
        } else {
          window.alert('방금 보내신 문의가 전송되지 않았습니다. ' + EMAIL + ' 로 직접 보내주세요.');
        }
      });
  });

  window.addEventListener('hashchange', render);
  render();
})();
