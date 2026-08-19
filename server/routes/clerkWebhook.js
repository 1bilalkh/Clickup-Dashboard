import express from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import User from "../models/User.js";

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const evt = await verifyWebhook(req);

      if (evt.type === "user.created") {
        const { id, first_name, last_name, email_addresses } = evt.data;

        const email =
          email_addresses?.[0]?.email_address?.toLowerCase();

        const name =
          `${first_name || ""} ${last_name || ""}`.trim() || "User";

        if (!email) {
          return res.status(400).json({
            message: "User email not found",
          });
        }

        const user = await User.findOneAndUpdate(
          { clerkId: id },
          {
            clerkId: id,
            name,
            email,
            role: "User",
          },
          {
            new: true,
            upsert: true,
          }
        );

        console.log("✅ Clerk user saved:", user.email);
      }

      res.status(200).json({
        message: "Webhook received",
      });
    } catch (error) {
      console.error("❌ Clerk webhook error:", error);

      res.status(400).json({
        message: "Webhook verification failed",
        error: error.message,
      });
    }
  }
);

export default router;