// The demo popups are fixed-size iframes (they carry their own layout), so on
// narrow screens they are scaled down uniformly to fit the viewport rather than
// reflowed. The scale is a ratio of two lengths, which calc() can only express
// via typed division -- calc((100vw - 40px) / 367px) -- and Firefox implements
// no version of that, dropping the whole transform. Computed here instead, the
// same way the hero popup already does it in index.html.
(function () {
  var FRAME_NATIVE_WIDTH = 367;
  var STAGE_NATIVE_WIDTH = 585;
  var GUTTER = 40;
  var root = document.documentElement;

  function updatePopupDemoScale() {
    // clientWidth rather than innerWidth: excludes a scrollbar the popup can't overlap.
    var available = root.clientWidth - GUTTER;
    if (available <= 0) return;
    root.style.setProperty("--popup-demo-scale", (available / FRAME_NATIVE_WIDTH).toFixed(4));
    root.style.setProperty("--popup-history-scale", (available / STAGE_NATIVE_WIDTH).toFixed(4));
  }

  updatePopupDemoScale();

  // Observing the element rather than listening for window resize: the CSS this
  // replaces used 100vw and so tracked every width change, including ones that
  // arrive without a resize event.
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(updatePopupDemoScale).observe(root);
  } else {
    window.addEventListener("resize", updatePopupDemoScale);
    window.addEventListener("orientationchange", updatePopupDemoScale);
  }
})();
