const policyHolderModels = require("../models/policyHolderModels");
const policyHolder = require("../models/policyHolderModels");
const policy = require("../models/policyModels");

const createPolicyControler = async (req, res) => {
  try {
    const policyHolderId = req.policyHolderId;

    const user = await policyHolder.findById(policyHolderId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Policy holder not exist",
      });
    }

    const {
      image,
      policyType,
      policyAmount,
      policyPremium,
      policyHolderNominee,
      policyHolderNomineeRelation,
    } = req.body;

    const policyStatus = "Pending";

    if (
      !image ||
      !policyHolderId ||
      !policyType ||
      !policyAmount ||
      !policyPremium ||
      !policyStatus ||
      !policyHolderNominee ||
      !policyHolderNomineeRelation
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const policyData = await policy.create({
      image,
      policyHolderId,
      policyType,
      policyAmount,
      policyPremium,
      policyStatus,
      policyHolderNominee,
      policyHolderNomineeRelation,
    });

    user.policy.push(policyData._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Policy created successfully",
      data: policyData,
    });
  } catch (error) {
    console.log("Error in policy creation ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPolicyControler = async (req, res) => {
  try {
    const policyId = req.params.id;
    if (!policyId) {
      return res.status(400).json({
        success: false,
        message: "Policy id is required",
      });
    }

    const policyHolderData = await policyHolder.findById(req.policyHolderId);

    if (!policyHolderData.policy.includes(policyId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid credential",
      });
    }

    const policyData = await policy.findById(policyId);
    if (!policyData) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Policy found",
      data: policyData,
    });
  } catch (error) {
    console.log("Error in getting policy ", error);
    res.status(500).json({
      success: false,
      message: "Internal server in get policy error",
    });
  }
};

const getAllPolicy = async (req, res) => {
  try {
    const policyHolderId = req.policyHolderId;


    const allPolicy = await policyHolder
      .findById(policyHolderId)
      .select("policy")
      .populate("policy");

    res.status(200).send({
      success: true,
      message: "All polices",
      data: allPolicy.policy,
    });
  } catch (error) {
    console.log("Error in getting all policy ", error);
    res.status(500).json({
      success: false,
      message: "Internal server in get all policy error",
    });
  }
};

module.exports = { createPolicyControler, getPolicyControler, getAllPolicy };
