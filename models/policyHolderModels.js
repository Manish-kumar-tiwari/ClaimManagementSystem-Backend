const mongoose = require("mongoose");

const policyHolderSchema = new mongoose.Schema(
  {
    policyHolderName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    policyHolderEmail: {
      type: String,
      required: true,
    },
    policyHolderPhone: {
      type: Number,
      required: true,
    },
    policyHolderAddress: {
      type: String,
      required: true,
    },
    policyHolderDOB: {
      type: String,
      required: true,
    },
    policyHolderGender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    policy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "policy",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("policyHolder", policyHolderSchema);
