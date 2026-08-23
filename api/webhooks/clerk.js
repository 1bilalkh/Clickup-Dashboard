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