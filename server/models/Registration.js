import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    program: {
      type: String,
      required: true,
      trim: true,
    },

    programType: {
      type: String,
      required: true,
      enum: ["Online", "Onsite", "Hybrid"],
    },

    startDate: {
      type: Date,
      required: true,
    },

    preferredTime: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      default: "Morning",
    },

    status: {
      type: String,
      enum: ["Pending", "Active", "Completed", "Cancelled"],
      default: "Pending",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model(
  "Registration",
  registrationSchema
);

export default Registration;