import './assets/style.css';

import './components/app-desktop';
import './components/app-window';
import './components/app-start-button';
import './components/dice-repl/dice-cli';
import './components/note-pad';

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
});
