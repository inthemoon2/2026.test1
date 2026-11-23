// 문항에 넣는 그림·표 (교재 5쪽의 실행 결과를 재현). 정답은 포함하지 않습니다.
(function () {
  function rng(seed) {
    var s = seed >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function gauss(r) {
    var u = 0, v = 0;
    while (u === 0) u = r();
    while (v === 0) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  var SP = ['Adelie', 'Chinstrap', 'Gentoo'];
  var COLORS = ['#4c72b0', '#dd8452', '#55a868'];

  // 공통 축/프레임 (0~1 정규화 축)
  function frame(w, h, m, xl, yl, ticks) {
    var s = '<rect x="' + m.l + '" y="' + m.t + '" width="' + (w - m.l - m.r) + '" height="' + (h - m.t - m.b) + '" fill="none" stroke="#333" stroke-width="1"/>';
    ticks.forEach(function (t) {
      var x = m.l + t * (w - m.l - m.r), y = h - m.b - t * (h - m.t - m.b);
      s += '<line x1="' + x + '" x2="' + x + '" y1="' + (h - m.b) + '" y2="' + (h - m.b + 4) + '" stroke="#333"/>';
      s += '<text x="' + x + '" y="' + (h - m.b + 16) + '" font-size="10" text-anchor="middle" fill="#333">' + t.toFixed(1) + '</text>';
      s += '<line y1="' + y + '" y2="' + y + '" x1="' + (m.l - 4) + '" x2="' + m.l + '" stroke="#333"/>';
      s += '<text y="' + (y + 3) + '" x="' + (m.l - 8) + '" font-size="10" text-anchor="end" fill="#333">' + t.toFixed(1) + '</text>';
    });
    s += '<text x="' + (m.l + (w - m.l - m.r) / 2) + '" y="' + (h - 8) + '" font-size="12" text-anchor="middle" fill="#222">' + xl + '</text>';
    s += '<text transform="translate(14 ' + (m.t + (h - m.t - m.b) / 2) + ') rotate(-90)" font-size="12" text-anchor="middle" fill="#222">' + yl + '</text>';
    return s;
  }

  var F = {};

  F.head = function () {
    var rows = [
      [0, 'Adelie', 'Torgersen', '39.1', '18.7', '181.0', '3750.0', 'MALE'],
      [1, 'Adelie', 'Torgersen', '39.5', '17.4', '186.0', '3800.0', 'FEMALE'],
      [2, 'Adelie', 'Torgersen', '40.3', '18.0', '195.0', '3250.0', 'FEMALE'],
      [3, 'Adelie', 'Torgersen', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN'],
      [4, 'Adelie', 'Torgersen', '36.7', '19.3', '193.0', '3450.0', 'FEMALE']
    ];
    var h = '<table class="datatable"><tr><th></th><th>species</th><th>island</th><th>culmen_length_mm</th><th>culmen_depth_mm</th><th>flipper_length_mm</th><th>body_mass_g</th><th>sex</th></tr>';
    rows.forEach(function (r) {
      h += '<tr' + (r[0] === 3 ? ' class="nan"' : '') + '><td>' + r[0] + '</td>' + r.slice(1).map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    });
    return h + '</table><div class="cap">실행 결과</div>';
  };

  F.describe = function () {
    var rows = [
      ['count', '342.000000', '342.000000', '342.000000', '342.000000'],
      ['mean', '43.921930', '17.151170', '200.915205', '4201.754386'],
      ['std', '5.459584', '1.974793', '14.061714', '801.954536'],
      ['min', '32.100000', '13.100000', '172.000000', '2700.000000'],
      ['25%', '39.225000', '15.600000', '190.000000', '3550.000000'],
      ['50%', '44.450000', '17.300000', '197.000000', '4050.000000'],
      ['75%', '48.500000', '18.700000', '213.000000', '4750.000000'],
      ['max', '59.600000', '21.500000', '231.000000', '6300.000000']
    ];
    var h = '<table class="datatable"><tr><th></th><th>culmen_length_mm</th><th>culmen_depth_mm</th><th>flipper_length_mm</th><th>body_mass_g</th></tr>';
    rows.forEach(function (r) { h += '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; });
    return h + '</table><div class="cap">실행 결과</div>';
  };

  F.bar = function () {
    var vals = [152, 68, 124], w = 420, h = 300, m = { l: 52, r: 14, t: 14, b: 50 };
    var pw = w - m.l - m.r, ph = h - m.t - m.b, max = 160, s = '';
    [0, 20, 40, 60, 80, 100, 120, 140].forEach(function (t) {
      var y = h - m.b - t / max * ph;
      s += '<line x1="' + (m.l - 4) + '" x2="' + m.l + '" y1="' + y + '" y2="' + y + '" stroke="#333"/><text x="' + (m.l - 8) + '" y="' + (y + 3) + '" font-size="10" text-anchor="end" fill="#333">' + t + '</text>';
    });
    vals.forEach(function (v, i) {
      var bw = pw / 3, x = m.l + i * bw + bw * 0.1, bh = v / max * ph;
      s += '<rect x="' + x + '" y="' + (h - m.b - bh) + '" width="' + (bw * 0.8) + '" height="' + bh + '" fill="' + ['#3b75a0', '#d97c3e', '#4a8f48'][i] + '"/>';
      s += '<text x="' + (x + bw * 0.4) + '" y="' + (h - m.b + 15) + '" font-size="11" text-anchor="middle" fill="#333">' + SP[i] + '</text>';
    });
    s += '<rect x="' + m.l + '" y="' + m.t + '" width="' + pw + '" height="' + ph + '" fill="none" stroke="#333"/>';
    s += '<text x="' + (m.l + pw / 2) + '" y="' + (h - 8) + '" font-size="12" text-anchor="middle" fill="#222">species</text>';
    s += '<text transform="translate(13 ' + (m.t + ph / 2) + ') rotate(-90)" font-size="12" text-anchor="middle" fill="#222">count</text>';
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="420" role="img" aria-label="종별 데이터 수 막대그래프">' + s + '</svg><div class="cap">실행 결과: 세 가지 펭귄 종의 데이터 수</div>';
  };

  F.scatterSpecies = function () {
    var w = 440, h = 330, m = { l: 52, r: 16, t: 14, b: 46 }, pw = w - m.l - m.r, ph = h - m.t - m.b;
    var r = rng(11), s = frame(w, h, m, 'culmen_length_mm', 'culmen_depth_mm', [0, .2, .4, .6, .8, 1]);
    var spec = [[38.8, 2.7, 18.35, 1.2, 70], [48.8, 3.3, 18.4, 1.1, 60], [47.5, 3.1, 15.0, 1.0, 65]];
    spec.forEach(function (p, i) {
      for (var k = 0; k < p[4]; k++) {
        var xl = (p[0] + gauss(r) * p[1] - 32.1) / (59.6 - 32.1), yd = (p[2] + gauss(r) * p[3] - 13.1) / (21.5 - 13.1);
        xl = Math.min(1, Math.max(0, xl)); yd = Math.min(1, Math.max(0, yd));
        s += '<circle cx="' + (m.l + xl * pw).toFixed(1) + '" cy="' + (h - m.b - yd * ph).toFixed(1) + '" r="2.8" fill="' + COLORS[i] + '" opacity=".9"/>';
      }
    });
    // 범례
    s += '<rect x="' + (m.l + 8) + '" y="' + (m.t + 6) + '" width="86" height="58" rx="3" fill="#fff" stroke="#ccc"/><text x="' + (m.l + 14) + '" y="' + (m.t + 19) + '" font-size="10" fill="#333">species</text>';
    SP.forEach(function (n, i) {
      s += '<circle cx="' + (m.l + 18) + '" cy="' + (m.t + 29 + i * 12) + '" r="3" fill="' + COLORS[i] + '"/><text x="' + (m.l + 26) + '" y="' + (m.t + 32 + i * 12) + '" font-size="10" fill="#333">' + n + '</text>';
    });
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="440" role="img" aria-label="종별 색을 구분한 산점도">' + s + '</svg><div class="cap">실행 결과 (정규화된 값)</div>';
  };

  F.reg = function () {
    var w = 440, h = 330, m = { l: 52, r: 16, t: 14, b: 46 }, pw = w - m.l - m.r, ph = h - m.t - m.b;
    var r = rng(5), pts = [], i, k;
    var spec = [[38.8, 2.7, 3700, 460, 70], [48.8, 3.3, 3730, 380, 60], [47.5, 3.1, 5080, 500, 65]];
    spec.forEach(function (p) {
      for (k = 0; k < p[4]; k++) {
        var x = (p[0] + gauss(r) * p[1] - 32.1) / (59.6 - 32.1);
        var y = (p[2] + gauss(r) * p[3] - 2700) / (6300 - 2700);
        pts.push([Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))]);
      }
    });
    var n = pts.length, mx = 0, my = 0, sxx = 0, sxy = 0;
    pts.forEach(function (p) { mx += p[0]; my += p[1]; });
    mx /= n; my /= n;
    pts.forEach(function (p) { sxx += (p[0] - mx) * (p[0] - mx); sxy += (p[0] - mx) * (p[1] - my); });
    var b = sxy / sxx, a = my - b * mx;
    var s = frame(w, h, m, 'culmen_length_mm', 'body_mass_g', [0, .2, .4, .6, .8, 1]);
    function X(v) { return m.l + v * pw; } function Y(v) { return h - m.b - v * ph; }
    var x0 = 0.02, x1 = 0.98;
    function band(x) { return 0.025 + 0.12 * Math.pow(x - mx, 2); }
    s += '<polygon fill="#55a868" opacity=".22" points="' + X(x0) + ',' + Y(a + b * x0 + band(x0)) + ' ' + X(x1) + ',' + Y(a + b * x1 + band(x1)) + ' ' + X(x1) + ',' + Y(a + b * x1 - band(x1)) + ' ' + X(x0) + ',' + Y(a + b * x0 - band(x0)) + '"/>';
    pts.forEach(function (p) { s += '<circle cx="' + X(p[0]).toFixed(1) + '" cy="' + Y(p[1]).toFixed(1) + '" r="2.8" fill="#2e8b57" opacity=".85"/>'; });
    s += '<line x1="' + X(x0) + '" y1="' + Y(a + b * x0) + '" x2="' + X(x1) + '" y2="' + Y(a + b * x1) + '" stroke="#2e8b57" stroke-width="2.2"/>';
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="440" role="img" aria-label="회귀선이 있는 산점도">' + s + '</svg><div class="cap">실행 결과 (정규화된 값)</div>';
  };

  F.heat = function () {
    var names = ['culmen_length_mm', 'culmen_depth_mm', 'flipper_length_mm', 'body_mass_g'];
    var M = [[1, -0.23, 0.65, 0.59], [-0.23, 1, -0.58, -0.47], [0.65, -0.58, 1, 0.87], [0.59, -0.47, 0.87, 1]];
    var w = 470, h = 420, ml = 130, mt = 12, cs = 70, s = '';
    function col(v) {   // Greens (낮음 → 높음)
      var t = Math.min(1, Math.max(0, (v + 0.4) / 1.4));
      var stops = [[247, 252, 245], [199, 233, 192], [116, 196, 118], [35, 139, 69], [0, 68, 27]];
      var p = t * 4, i = Math.min(3, Math.floor(p)), f = p - i;
      var c = stops[i].map(function (v0, j) { return Math.round(v0 + (stops[i + 1][j] - v0) * f); });
      return { fill: 'rgb(' + c.join(',') + ')', dark: t > 0.5 };
    }
    M.forEach(function (row, i) {
      s += '<text x="' + (ml - 6) + '" y="' + (mt + i * cs + cs / 2 + 4) + '" font-size="11" text-anchor="end" fill="#222">' + names[i] + '</text>';
      row.forEach(function (v, j) {
        var c = col(v);
        s += '<rect x="' + (ml + j * cs) + '" y="' + (mt + i * cs) + '" width="' + cs + '" height="' + cs + '" fill="' + c.fill + '"/>';
        s += '<text x="' + (ml + j * cs + cs / 2) + '" y="' + (mt + i * cs + cs / 2 + 4) + '" font-size="12" text-anchor="middle" fill="' + (c.dark ? '#fff' : '#222') + '">' + (v === 1 ? '1' : v) + '</text>';
      });
    });
    names.forEach(function (nm, j) {
      s += '<text transform="translate(' + (ml + j * cs + cs / 2 + 4) + ' ' + (mt + 4 * cs + 8) + ') rotate(-90)" font-size="11" text-anchor="end" fill="#222">' + nm + '</text>';
    });
    // 컬러바
    for (var k = 0; k < 40; k++) {
      var v = 1 - k / 40 * 1.4, c = col(v);
      s += '<rect x="' + (ml + 4 * cs + 14) + '" y="' + (mt + k * 7) + '" width="14" height="7.2" fill="' + c.fill + '"/>';
    }
    [1.0, 0.6, 0.2, -0.2].forEach(function (t) {
      s += '<text x="' + (ml + 4 * cs + 34) + '" y="' + (mt + (1 - t) / 1.4 * 280 + 4) + '" font-size="10" fill="#333">' + t.toFixed(1) + '</text>';
    });
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="470" role="img" aria-label="상관계수 히트맵">' + s + '</svg><div class="cap">실행 결과</div>';
  };

  window.FIGURES = F;
})();
