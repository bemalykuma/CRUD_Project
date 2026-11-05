import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { app } from "./app.js";

// ตอนรันในเครื่อง ให้เปิดหน้าเว็บจากโฟลเดอร์ public ได้ด้วย (บน Vercel มันทำให้เอง)
app.use("/*", serveStatic({ root: "./public" }));

serve({ fetch: app.fetch, port: +(process.env.PORT ?? 3000) }, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`),
);
