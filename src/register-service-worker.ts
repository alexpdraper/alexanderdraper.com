async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      }
      if (registration.waiting) {
        console.log("Service worker waiting");
      }
      if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error("Service worker registration failed with error:", error);
    }
  }
}

registerServiceWorker();
