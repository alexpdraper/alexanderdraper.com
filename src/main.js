import 'normalize.css'
import './assets/main.styl'

// A pretty much entirely unnecessary function for making sure the DOM is ready
var domReady = (function () {
  var fns = [];
  var loaded = document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll);

  function completed () {
    loaded = true;
    document.removeEventListener('DOMContentLoaded', completed);
    window.removeEventListener('load', completed);
    var fn;
    while (fn = fns.shift()) fn();
  }

  if (!loaded) {
    document.addEventListener('DOMContentLoaded', completed);
    window.addEventListener('load', completed);
  }

  return function (cb) {
    if (loaded) window.setTimeout(cb, 0);
    else fns.push(cb);
  }
})();

domReady(function () {
  // Add the year to the copyright footer.
  var $yearEl = document.getElementById('copyright-year');
  if ($yearEl) {
    $yearEl.textContent = new Date().getFullYear();
  }
});
