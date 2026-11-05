import { Hono } from "hono";
import { studentsController } from "./controllers/students.js";

export const app = new Hono();

app.route("/api/v1/students", studentsController);

app.notFound((c) => c.json({ error: "Route not found" }, 404));

app.onError((error, c) => {
  console.error(error);
  return c.json({ error: "Internal server error" }, 500);
});
