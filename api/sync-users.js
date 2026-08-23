import { createClerkClient } from "@clerk/backend";
import mongoose from "mongoose";
import User from "../server/models/User.js";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

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

    const response = await clerkClient.users.getUserList({
      limit: 100,
    });

    let updated = 0;

    for (const clerkUser of response.data) {
      const email =
        clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase();

      if (!email) continue;

      const name =
        `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
        "User";

      await User.findOneAndUpdate(
        { clerkId: clerkUser.id },
        {
          clerkId: clerkUser.id,
          name,
          email,
          imageUrl: clerkUser.imageUrl || "",
        },
        {
          new: true,
          upsert: true,
        }
      );

      updated++;
    }

    return res.status(200).json({
      message: "Users synced successfully",
      updated,
    });
  } catch (error) {
    console.error("❌ User sync error:", error);

    return res.status(500).json({
      message: "Failed to sync users",
      error: error.message,
    });
  }
}