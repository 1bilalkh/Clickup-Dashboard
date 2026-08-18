import express from "express";
import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

dns.setServers([
  "0.0.0.0",
  "8.8.8.8",
]);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
// app.use(express.json());

app.get("/test-cors", (req, res) => {
  res.json({
    message: "CORS is working",
  });
});

app.use("/api/users", userRoutes);


console.log("🔵 Starting server...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("❌ MongoDB connection failed!");
    console.log(error.message);
  });

app.listen(5000, () => {
  console.log("🚀 Express server running on http://localhost:5000");
});