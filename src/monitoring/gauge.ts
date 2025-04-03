import { Request, Response, NextFunction } from "express";
import client from "prom-client";

export const gauge = new client.Gauge({
  name: "number_of_active_requests",
  help: "gauge active request count helper",
  labelNames: ["method", "route", "statusCode"],
});

export function gaugeCount(req: Request, res: Response, next: NextFunction) {
  // increase first
  gauge.inc({
    method: req.method,
    route: req.path,
    statusCode: res.statusCode,
  });
  res.on("finish", () => {
    // when finish , decrease
    gauge.dec({
      method: req.method,
      route: req.path,
      statusCode: res.statusCode,
    });
  });
  // proceed
  next();
}
