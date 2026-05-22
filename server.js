module.exports = async (req, res) => {

  const TARGET =

    "https://model-gateway--laralaville317.replit.app";

  try {

    const headers = { ...req.headers };

    delete headers.host;

    const response = await fetch(TARGET + req.url, {

      method: req.method,

      headers,

      body:

        req.method === "GET" || req.method === "HEAD"

          ? undefined

          : JSON.stringify(req.body),

    });

    let body = await response.text();

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {

      const removerScript = `

<script>

(() => {

  const removePill = () => {

    const pill = document.querySelector("#replit-pill");

    if (pill) pill.remove();

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

    res.status(response.status);

    response.headers.forEach((value, key) => {

      if (key.toLowerCase() !== "content-length") {

        res.setHeader(key, value);

      }

    });

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(body);

  } catch (e) {

    console.error(e);

    res.status(500).json({

      error: e.message,

      stack: e.stack,

    });

  }

};
