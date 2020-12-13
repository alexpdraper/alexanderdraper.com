import './assets/style.css';

import './components/app-desktop';
import './components/app-window';
import WebCli from './components/dice-repl/web-cli';
import parse from './components/dice-repl/parse';

window.customElements.define('web-cli', WebCli);

const domReady = (callback: () => void) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', () => callback());
};

domReady(() => {
  // Add the year to the copyright footer.
  const $yearEl = document.getElementById('copyright-year');
  if ($yearEl) {
    $yearEl.textContent = new Date().getFullYear().toString();
  }

  const $repl = document.getElementById('dice-repl') as WebCli;
  $repl.addLine('Roll some dice! Try “1d6 + 3”');

  $repl.addEventListener<any>(
    'line',
    function (event: CustomEvent) {
      try {
        const fn = parse(event.detail);
        const result = fn();
        $repl.addLine(result.toString());
      } catch (e) {
        $repl.addLine(e.message);
      }
    },
    false
  );
});
