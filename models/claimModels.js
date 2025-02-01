const mongoose = require("mongoose");
const claimSchema = new mongoose.Schema(
  {
    policyHolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "policyHolder",
      required: true,
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "policy",
      required: true,
    },
    claimReason: {
      type: String,
      required: true,
    },
    claimType: {
      type: String,
      enum: ["Life", "Health", "Motor", "Travel"],
      required: true,
    },
    claimAmount: {
      type: Number,
      required: true,
    },
    claimStatus: {
      type: String,
      enum: ["Approved", "Rejected", "Pending"],
      required: true,
    },
    claimDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("claim", claimSchema);
