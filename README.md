## COUNTER: THE TOAL NUMBER OF HTTP REQUESTS

```
npm install prom-client
```

- src/monitoring/requestCount.ts:
```
import { NextFunction, Request, Response } from "express";
import client from "prom-client";

const counter = new client.Counter({
  name: "request_Counter",
  help: "total request count helper",
  labelNames: ["method", "route", "statusCode"],
});

export function requestCount(req: Request, res: Response, next: NextFunction) {
  counter.inc({
    method: req.method, // GET, POST
    route: req.path, // ROTE PATH
    statusCode: res.statusCode, // RESPONSE STATUS
  });
  next();
}
```

- export /metrics endpoint
- src/index.ts
```
import client from "prom-client";

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})
```

```
npm run start
```
- visit ``` http://localhost:3000/metrics```