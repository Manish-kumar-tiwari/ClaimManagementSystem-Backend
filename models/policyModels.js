const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    policyHolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "policyHolder",
      required: true,
    },

    policyType: {
      type: String,
      enum: ["Life", "Health", "Motor", "Travel"],
      required: true,
    },

    policyStartDate: {
      type: Date,
      required: true,
    },

    policyEndDate: {
      type: Date,
      required: true,
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
