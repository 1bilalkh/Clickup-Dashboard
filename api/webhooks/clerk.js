import express from "express";
import clerkWebhook from "../../server/routes/clerkWebhook.js";

const app = express();

app.use("/", clerkWebhook);

export default app;