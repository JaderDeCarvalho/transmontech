(function () {
  "use strict";

  var sectionIds = ["home", "services", "technologies", "process", "about", "contact"];
  var scrollDurationMs = 300;
  var scrollPadding = 60;

  document.addEventListener("click", function (e) {
    var link = e.target.closest("a[href^=\"#\"]");
    if (!link || link.getAttribute("href") === "#") return;
    var id = link.getAttribute("href").slice(1);
    var target = document.getElementById(id);
    if (!target || sectionIds.indexOf(id) === -1) return;
    e.preventDefault();
    history.replaceState(null, "", "#" + id);
    setActiveFromHash();
    var start = window.scrollY;
    var end = target.getBoundingClientRect().top + start - scrollPadding;
    var t0 = performance.now();
    function step(now) {
      var t = Math.min((now - t0) / scrollDurationMs, 1);
      window.scrollTo(0, start + (end - start) * t);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  function setActiveFromHash() {
    var hash = window.location.hash.slice(1);
    if (hash && sectionIds.indexOf(hash) !== -1) {
      document.body.setAttribute("data-active-section", hash);
    }
  }

  function setActiveSection(id) {
    document.body.setAttribute("data-active-section", id);
  }

  // Sync active section from scroll position
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-120px 0px -55% 0px",
      threshold: 0
    }
  );

  sectionIds.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // Initial state from URL hash (e.g. direct link or refresh), or default to home
  if (window.location.hash) {
    setActiveFromHash();
  } else {
    document.body.setAttribute("data-active-section", "home");
  }

  // Update active section when user clicks a nav link (hash changes)
  window.addEventListener("hashchange", setActiveFromHash);
})();
