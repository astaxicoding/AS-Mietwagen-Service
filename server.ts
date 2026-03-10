
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log('NODE_ENV:', process.env.NODE_ENV);
  app.use(express.json());

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/send-email", async (req, res) => {
    if (!resend) {
      console.error("RESEND_API_KEY is not set");
      return res.status(500).json({ success: false, message: "Email service not configured" });
    }

    const { to, subject, html, text } = req.body;

    try {
      const { data, error } = await resend.emails.send({
        from: "AS Taxi Service <onboarding@resend.dev>", // Default Resend domain for testing
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ success: false, error });
      }

      res.json({ success: true, data });
    } catch (err: any) {
      console.error("Server error sending email:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    console.log('Login attempt received');
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USERNAME || "AS.TAXI";
    const adminPass = process.env.ADMIN_PASSWORD || "##ASTAXI##";

    if (username === adminUser && password === adminPass) {
      console.log('Login successful');
      res.json({ success: true, token: "admin-session-token-123" });
    } else {
      console.log('Login failed: Invalid credentials');
      res.status(401).json({ success: false, message: "Ungültige Anmeldedaten" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
