import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  app.post("/api/send-email", async (req, res) => {
    if (!resend) {
      return res.status(500).json({ success: false, message: "Email service not configured" });
    }
    const { to, subject, html, text } = req.body;
    try {
      const { data, error } = await resend.emails.send({
        from: "AS Taxi Service <onboarding@resend.dev>",
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text
      });
      if (error) return res.status(400).json({ success: false, error });
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body || {};
    const adminUser = process.env.ADMIN_USERNAME || "AS.TAXI";
    const adminPass = process.env.ADMIN_PASSWORD || "##ASTAXI##";

    if (username === adminUser && password === adminPass) {
      res.json({ success: true, token: "admin-session-token-123" });
    } else {
      res.status(401).json({ success: false, message: "Ungültige Anmeldedaten." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting Vite in middleware mode...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
