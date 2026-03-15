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
      rootMargin: "0px 0px -20% 0px"
    });
    techObserver.observe(technologies);
  }

  if (process) {
    var processObserver = new IntersectionObserver(toggleInView, {
      threshold: 0.15,
      rootMargin: "0px 0px -25% 0px"
    });
    processObserver.observe(process);

    var processScroll = process.querySelector(".process-scroll");
    var processSteps = process.querySelectorAll(".process-step");
    var processDots = process.querySelectorAll(".process-dot");

    function setActiveDot(index) {
      processDots.forEach(function (dot, i) {
        if (i === index) {
          dot.classList.add("is-active");
        } else {
          dot.classList.remove("is-active");
        }
      });
    }

    function snapToClosestStep() {
      if (!processScroll || !processSteps.length) return;
      var center = processScroll.scrollLeft + processScroll.clientWidth / 2;
      var closestIndex = 0;
      var closestDist = Infinity;

      processSteps.forEach(function (step, index) {
        var stepCenter = step.offsetLeft + step.offsetWidth / 2;
        var dist = Math.abs(stepCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = index;
        }
      });

      var targetStep = processSteps[closestIndex];
      var targetLeft =
        targetStep.offsetLeft - (processScroll.clientWidth - targetStep.offsetWidth) / 2;
      processScroll.scrollTo({ left: targetLeft, behavior: "smooth" });
      setActiveDot(closestIndex);
    }

    if (processScroll) {
      var isDown = false;
      var startX = 0;
      var scrollLeft = 0;

      processScroll.addEventListener("mousedown", function (e) {
        isDown = true;
        processScroll.classList.add("is-dragging");
        startX = e.pageX - processScroll.offsetLeft;
        scrollLeft = processScroll.scrollLeft;
      });

      processScroll.addEventListener("mouseleave", function () {
        isDown = false;
        processScroll.classList.remove("is-dragging");
      });

      window.addEventListener("mouseup", function () {
        isDown = false;
        processScroll.classList.remove("is-dragging");
      });

      processScroll.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - processScroll.offsetLeft;
        var walk = startX - x;
        processScroll.scrollLeft = scrollLeft + walk;
      });

      if (processDots.length && processSteps.length) {
        processDots.forEach(function (dot, index) {
          dot.addEventListener("click", function () {
            var step = processSteps[index];
            if (!step) return;
            var targetLeft =
              step.offsetLeft - (processScroll.clientWidth - step.offsetWidth) / 2;
            processScroll.scrollTo({ left: targetLeft, behavior: "smooth" });
            setActiveDot(index);
          });
        });

        var scrollTimeout;
        processScroll.addEventListener("scroll", function () {
          var center = processScroll.scrollLeft + processScroll.clientWidth / 2;
          var closestIndex = 0;
          var closestDist = Infinity;

          processSteps.forEach(function (step, index) {
            var stepCenter = step.offsetLeft + step.offsetWidth / 2;
            var dist = Math.abs(stepCenter - center);
            if (dist < closestDist) {
              closestDist = dist;
              closestIndex = index;
            }
          });

          setActiveDot(closestIndex);

          if (window.innerWidth <= 900) {
            if (scrollTimeout) {
              clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(snapToClosestStep, 120);
          }
        });
      }
    }
  }
})();
