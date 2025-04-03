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
