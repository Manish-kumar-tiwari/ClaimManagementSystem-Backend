const policy = require("../models/policyModels");
const claim = require("../models/claimModels");

const createClaimControler = async (req, res) => {
  try {
    const policyId = req.params.id;
    const claimDate = new Date();
    const claimStatus = "Pending";
    const { claimAmount, claimReason, claimType } = req.body;

    if (!policyId || !claimAmount || !claimReason || !claimType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const policyData = await policy.findById(policyId);

    if (!policyData) {
      return res.status(400).send({
        success: false,
        message: "Policy Id not valid",
      });
    }

    if (policyData.policyHolderId.toString() !== req.policyHolderId) {
      return res.status(401).send({
        success: false,
        message: "Policy Id not valid for you",
      });
    }

    const claimData = await claim.find({ policyId });

    if (claimData.length !== 0) {
      return res.status(400).send({
        success: false,
        message: "Claim alreay Exists",
      });
    }

    if (policyData.policyAmount < claimAmount) {
      return res.status(400).send({
        success: false,
        message: "You can't clam more than policy ammount",
      });
    }

    const newClaim = await claim.create({
      policyHolderId: policyData.policyHolderId,
      policyId,
      claimDate,
      claimAmount,
      claimReason,
      claimType,
      claimStatus,
    });

    res.status(201).send({
      success: true,
      message: "Claim created successfully",
      data: newClaim,
    });
  } catch (error) {
    console.log("Error in claim creation ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getClaimControler = async (req, res) => {
  try {
    const claimId = req.params.id;
    if (!claimId) {
      return res.status(400).json({
        success: false,
        message: "Claim id is required",
      });
    }

    const claimData = await claim.findById(claimId);

    if (!claimData) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    res.status(200).send({
      success: true,
      data: claimData,
    });
  } catch (error) {
    console.log("Error in getting claim", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateClaimControler = async (req, res) => {
  try {
    const claimId = req.params.id;
    const { claimAmount } = req.body;
    if (!claimId || !claimAmount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const claimData = await claim.findById(claimId);
    if (!claimData) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (claimData.policyHolderId.toString() !== req.policyHolderId) {
      return res.status(401).send({
        success: false,
        message: "You are not the authorize user to update this clam",
      });
    }

    const policydata = await policy.findById(claimData.policyId);

    if (policydata.policyAmount < claimAmount) {
      return res.status(400).send({
        success: false,
        message: "You can't clam more than conerange ammount",
      });
    }

    claimData.claimAmount = claimAmount;

    await claimData.save();

    res.status(200).send({
      success: true,
      message: "Claim updated successfully",
      data: claimData,
    });
  } catch (error) {
    console.log("Error in updating claim", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteClaimControler = async (req, res) => {
  try {
    const claimId = req.params.id;
    if (!claimId) {
      return res.status(400).json({
        success: false,
        message: "Claim id is required",
      });
    }

    const claimData = await claim.findById(claimId);

    if (!claimData) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (claimData.policyHolderId.toString() !== req.policyHolderId) {
      return res.status(401).send({
        success: false,
        message: "You are not the authorize user to detete this clam",
      });
    }

    await claim.findByIdAndDelete(claimId);

    res.status(200).send({
      success: true,
      message: "Claim deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting claim", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createClaimControler,
  getClaimControler,
  updateClaimControler,
  deleteClaimControler,
};
