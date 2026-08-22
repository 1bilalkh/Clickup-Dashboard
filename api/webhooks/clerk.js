import { verifyWebhook } from "@clerk/express/webhooks";
import mongoose from "mongoose";
import User from "../../server/models/User.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

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

    return res.status(200).json({
      message: "Webhook received",
    });
  } catch (error) {
    console.error("❌ Clerk webhook error:", error);

    return res.status(400).json({
      message: "Webhook verification failed",
      error: error.message,
    });
  }
}