const timeLogger = (key) => {
  if (key instanceof Function) {
    key = key.toString();
  }

  return {
    start() {
      console.log(key);
      console.time(key);
    },
    end() {
      console.timeEnd(key);
    },
  };
};

const withTimeLog = async (cb) => {
  const logger = timeLogger(cb);
  logger.start();

  let result = cb();
  if (result instanceof Promise) {
    result = await result;
  }

  logger.end();
  return result;
};

async function addResourcesToCache(resources) {
  const cache = await withTimeLog(() => caches.open("v1"));
  await withTimeLog(() => cache.addAll(resources));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/assets/main.css",
      "/assets/main.js",
      "/static/favicon.ico/favicon-96x96.png",
      "/static/fonts/3AA86B_0_0.eot",
      "/static/fonts/3AA86B_0_0.ttf",
      "/static/fonts/3AA86B_0_0.woff",
      "/static/fonts/3AA86B_0_0.woff2",
      "/static/fonts/3AA86B_1_0.eot",
      "/static/fonts/3AA86B_1_0.ttf",
      "/static/fonts/3AA86B_1_0.woff",
      "/static/fonts/3AA86B_1_0.woff2",
    ])
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(async (response) => {
      if (response != null) {
        return response;
      }

      try {
        const networkResponse = await fetch(event.request.clone());
        return networkResponse;
      } catch (error) {
        console.error(error);

        return new Response("Network error", {
          status: 408,
          headers: { "Content-Type": "text/plain" },
        });
      }
    })
  );
});
