import express from "express";
import { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  next();
  const endTime = Date.now();
  
  const timetook = endTime - startTime;
  console.log(`Request took ${endTime - startTime}ms`);

  if (timetook > 2) {
    console.log("taking too much time");
  } else {
    console.log("super fast");
  }
};

app.use(middleware);

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
