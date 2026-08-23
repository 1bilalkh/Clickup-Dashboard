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

      console.log("WEBHOOK TYPE:", evt.type);
      console.log("IMAGE URL:", evt.data?.image_url);

      if (evt.type === "user.created" || evt.type === "user.updated") {
        const {
          id,
          first_name,
          last_name,
          email_addresses,
          image_url,
        } = evt.data;

        const email =
          email_addresses?.[0]?.email_address?.toLowerCase();

        const name =
          `${first_name || ""} ${last_name || ""}`.trim() || "User";

        if (!email) {
          return res.status(400).json({
            message: "User email not found",
          });
        }

        console.log("🔥 BEFORE DB UPDATE");
        console.log("EVENT:", evt.type);
        console.log("CLERK ID:", id);
        console.log("EMAIL:", email);
        console.log("IMAGE URL:", image_url);

        const user = await User.findOneAndUpdate(
          { clerkId: id },
          {
            clerkId: id,
            name,
            email,
            role: "User",
            imageUrl: image_url || "",
          },
          {
            new: true,
            upsert: true,
          }
        );

        console.log("🔥 AFTER DB UPDATE");
        console.log("SAVED USER:", user.email);
        console.log("SAVED IMAGE:", user.imageUrl);
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