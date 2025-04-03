import express from "express";
// import { NextFunction, Request, Response } from "express";
import { requestCount } from "./monitoring/count";
import client from "prom-client";
import { gaugeCount } from "./monitoring/gauge";
import { histogramRequestCount } from "./monitoring/histogram";

const app = express();

app.use(express.json());
app.use(requestCount);
app.use(gaugeCount);
app.use(histogramRequestCount);

// export const middleware = (req: Request, res: Response, next: NextFunction) => {
//   const startTime = Date.now();
//   next();
//   const endTime = Date.now();

//   const timetook = endTime - startTime;
//   console.log(`Request took ${endTime - startTime}ms`);

//   if (timetook > 2) {
//     console.log("taking too much time");
//   } else {
//     console.log("super fast");
//   }
// };

//app.use(middleware);

app.get("/user", (req, res) => {
  res.send({
    name: "Rudra",
    age: 20,
  });
});

app.post("/user", (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: 10,
  });
});

app.listen(3000);

// from prom-client:
app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});
