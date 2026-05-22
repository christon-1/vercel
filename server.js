module.exports = async (req, res) => {
  const TARGET =
    "model-gateway--laralaville317.replit.app";

  try {
    const response = await fetch(TARGET + req.url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined,
      },
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    let body = await response.text();

    const contentType = response.headers.get("content-type") || "";

    // Inject remover script into HTML pages
    if (contentType.includes("text/html")) {
      const removerScript = `
<script>
(() => {
  const removePill = () => {
    const pill = document.querySelector("#replit-pill");
    if (pill) {
      pill.remove();
    }
  };

  removePill();

  const observer = new MutationObserver(() => {
    removePill();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
</script>
`;

      body = body.replace("</body>", `${removerScript}</body>`);
    }

    res.statusCode = response.status;

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-length") {
        res.setHeader(key, value);
      }
    });

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.end(body);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};
