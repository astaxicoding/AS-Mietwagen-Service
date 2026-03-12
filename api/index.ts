
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// API Routes
app.get("/api/health", (req, res) => {
  console.log("Health check hit");
  res.json({ status: "ok", env: process.env.NODE_ENV, vercel: !!process.env.VERCEL });
});

app.post("/api/send-email", async (req, res) => {
  console.log("Email request received");
  if (!resend) {
    console.error("RESEND_API_KEY is not set");
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
  console.log("Admin login attempt received");
  try {
    const { username, password } = req.body || {};
    
    // Check for various possible environment variable names
    const adminUser = process.env.ADMIN_USERNAME || process.env.USER || "AS.TAXI";
    const adminPass = process.env.ADMIN_PASSWORD || process.env.PASSWORD || process.env["AS.TAXI.ROBIN"] || "##ASTAXI##";

    if (username === adminUser && password === adminPass) {
      console.log("Login successful");
      res.json({ success: true, token: "admin-session-token-123" });
    } else {
      console.log("Login failed: Invalid credentials");
      res.status(401).json({ success: false, message: "Ungültige Anmeldedaten. Bitte prüfen Sie Benutzername und Passwort." });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Interner Serverfehler" });
  }
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Express error handler:", err);
  res.status(500).json({ success: false, message: "Etwas ist schief gelaufen!" });
});

// Vite middleware for development (AI Studio Preview)
const isDev = process.env.NODE_ENV !== "production" && !process.env.VERCEL;

if (isDev) {
  try {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } catch (e) {
    console.log("Vite middleware not loaded");
  }
}

// Only listen if not on Vercel
if (!process.env.VERCEL) {
  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
