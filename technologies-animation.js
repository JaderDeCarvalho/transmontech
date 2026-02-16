(function () {
  "use strict";
  function toggleInView(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }

  var technologies = document.getElementById("technologies");
  var process = document.getElementById("process");

  if (technologies) {
    var techObserver = new IntersectionObserver(toggleInView, {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    });
    techObserver.observe(technologies);
  }

  if (process) {
    var processObserver = new IntersectionObserver(toggleInView, {
      threshold: 0.2,
      rootMargin: "0px 0px -35% 0px"
    });
    processObserver.observe(process);
  }
})();
