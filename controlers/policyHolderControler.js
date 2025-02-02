const policyHolder = require("../models/policyHolderModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createPolicyHolder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      dateOfbirth,
      country,
      gender,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !dateOfbirth ||
      !country ||
      !gender ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (country !== "India") {
      return res.status(400).json({
        success: false,
        message: "Country should be India",
      });
    }

    const user = await policyHolder.findOne({ policyHolderEmail: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const policyHolderData = await policyHolder.create({
      policyHolderName: name,
      policyHolderEmail: email,
      policyHolderPhone: phone,
      policyHolderAddress: address,
      policyHolderDOB: dateOfbirth,
      policyHolderGender: gender,
      country,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: "Policy Holder created successfully",
      data: policyHolderData,
    });
  } catch (error) {
    console.log("Error in CretepolicyHolder", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPolicyHolder = async (req, res) => {
  try {
    const id = req.policyHolderId;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const user = await policyHolder.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Policy Holder not found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Policy Holder found successfully !",
      data: user,
    });
  } catch (error) {
    console.log("Error in getPolicyHolder", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await policyHolder.findOne({ policyHolderEmail: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.jwtSecret, {
      expiresIn: "7d",
    });

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Login successfull",
      data: user,
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "");
    res.status(200).send({
      success: true,
      message: "Logout Successfull",
    });
  } catch (error) {}
};

module.exports = {
  createPolicyHolder,
  getPolicyHolder,
  login,
  logout,
};
