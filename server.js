const TARGET = "https://credit-routerzip--cebest2000us1.replit.app";

export default async function handler(req, res) {
  try {
    const url = TARGET + req.url;

    const response = await fetch(url, {
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

    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const text = await response.text();

    res.send(text);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
