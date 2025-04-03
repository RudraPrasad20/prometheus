import { NextFunction, Request, Response } from "express";
import client from "prom-client";

export const histogram = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000], // Define buckets
});

export function histogramRequestCount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    histogram.observe(
      {
        method: req.method,
        route: req.path,
        code: res.statusCode,
      },
      endTime - startTime
    );
  });

  next();
}
