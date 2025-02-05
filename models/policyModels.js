const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    policyHolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "policyHolder",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    policyType: {
      type: String,
      required: true,
    },

    policyStartDate: {
      type: Date,
    },

    policyAmount: {
      type: Number,
      required: true,
    },

    policyPremium: {
      type: Number,
      required: true,
    },

    policyStatus: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      required: true,
    },

    policyHolderNominee: {
      type: String,
      required: true,
    },

    policyHolderNomineeRelation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("policy", policySchema);
