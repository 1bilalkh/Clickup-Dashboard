import express from "express";
import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";


dotenv.config();

dns.setServers([
  "0.0.0.0",
  "8.8.8.8",
]);

const app = express();


// =========================
// CORS
// =========================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://clickup-dashboard-1e5l.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],

    credentials: true,
  })
);

// =========================
// Normal JSON requests
// =========================
app.use(express.json());

// =========================
// Routes
// =========================
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/login", loginRoutes);

// =========================
// Test CORS
// =========================
app.get("/test-cors", (req, res) => {
  res.json({
    message: "CORS is working",
  });
});

console.log("🔵 Starting server...");

// =========================
// MongoDB
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("❌ MongoDB connection failed!");
    console.log(error.message);
  });

// =========================
// Local Development Server
// =========================
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log(
      "🚀 Express server running on http://localhost:5000"
    );
  });
}

// =========================
// Export for Vercel
// =========================
export default app;