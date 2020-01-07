import 'normalize.css';
import './assets/main.styl';
import WebCli from './components/dice-repl/web-cli.js';
import parse from './components/dice-repl/parse.js';

window.customElements.define('web-cli', WebCli);

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

  var $repl = document.getElementById('dice-repl');
  $repl.addLine('Roll some dice! Try “1d6 + 3”');

  $repl.addEventListener('line', function (event) {
    try {
      var fn = parse(event.detail);
      var result = fn();
      $repl.addLine(result);
    } catch (e) {
      $repl.addLine(e.message);
    }
  }, false);
});
