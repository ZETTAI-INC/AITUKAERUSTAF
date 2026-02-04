!(function e(o, n, r) {
  function i(s, l) {
    if (!n[s]) {
      if (!o[s]) {
        var a = "function" == typeof require && require;
        if (!l && a) return a(s, !0);
        if (t) return t(s, !0);
        var h = new Error("Cannot find module '" + s + "'");
        throw ((h.code = "MODULE_NOT_FOUND"), h);
      }
      var c = (n[s] = {
        exports: {}
      });
      o[s][0].call(
        c.exports,
        function(e) {
          var n = o[s][1][e];
          return i(n ? n : e);
        },
        c,
        c.exports,
        e,
        o,
        n,
        r
      );
    }
    return n[s].exports;
  }
  for (
    var t = "function" == typeof require && require, s = 0;
    s < r.length;
    s++
  )
    i(r[s]);
  return i;
})(
  {
    1: [
      function(e, o, n) {
        $(function() {
          var e = $(".icn-humberger , #overlay");
          e.on("click", function() {
            $(".icn-humberger").hasClass("is-open")
              ? ($(".icn-humberger").removeClass("is-open"),
                $("html").removeClass("remodal-is-locked"),
                $(".nav-sp , #overlay").fadeOut())
              : ($(".icn-humberger").addClass("is-open"),
                $("html").addClass("remodal-is-locked"),
                $(".nav-sp , #overlay").fadeIn());
          });
        });
      },
      {}
    ]
  },
  {},
  [1]
);
//# sourceMappingURL=bundle.js.map
