import mongoose from "mongoose";

const loginActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    clerkId: {
      type: String,
      required: true,
    },

    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    loginAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const LoginActivity = mongoose.model(
  "LoginActivity",
  loginActivitySchema
);

export default LoginActivity;