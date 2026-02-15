(function () {
  "use strict";
  var section = document.getElementById("technologies");
  if (!section) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
        } else {
          section.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  observer.observe(section);
})();
