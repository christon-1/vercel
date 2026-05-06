module.exports = async (req, res) => {
  const TARGET =
    "https://credit-routerzip--cebest2000us1.replit.app";

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

    const text = await response.text();

    res.statusCode = response.status;

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.end(text);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};
