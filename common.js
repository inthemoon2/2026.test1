// 공통: API 호출, 서식 도우미
(function () {
  var cfg = window.APP_CONFIG || {};

  window.api = function (action, data, opts) {
    opts = opts || {};
    if (!cfg.API_URL) {
      return Promise.reject(new Error('config.js 의 API_URL 이 비어 있습니다. README.md 의 배포 순서를 확인하세요.'));
    }
    var body = JSON.stringify(Object.assign({ action: action }, data || {}));
    return fetch(cfg.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },   // 사전 요청(CORS preflight) 회피
      body: body,
      keepalive: !!opts.keepalive
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j.ok) throw new Error(j.error || '서버 오류');
      return j;
    });
  };

  window.fmtSec = function (s) {
    s = Math.max(0, Math.round(Number(s) || 0));
    var m = Math.floor(s / 60), r = s % 60;
    if (m >= 60) { var h = Math.floor(m / 60); m = m % 60; return h + '시간 ' + m + '분'; }
    return m > 0 ? m + '분 ' + (r < 10 ? '0' : '') + r + '초' : r + '초';
  };
  window.fmtClock = function (s) {
    s = Math.max(0, Math.round(Number(s) || 0));
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  };
  window.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  window.classOf = function (id) { return String(id).slice(0, 2); };       // 1101 → '11' (1학년 1반)
  window.classLabel = function (c) { return c.charAt(0) + '학년 ' + c.charAt(1) + '반'; };
  window.idLabel = function (id) {
    id = String(id);
    return id + ' (' + id.charAt(0) + '학년 ' + id.charAt(1) + '반 ' + Number(id.slice(2)) + '번)';
  };
})();
