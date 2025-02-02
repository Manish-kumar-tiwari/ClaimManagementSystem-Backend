const express = require("express");
const {
  createPolicyHolder,
  getPolicyHolder,
  login,
  logout,
} = require("../controlers/policyHolderControler.js");
const { Oauth } = require("../middlewares/Oauth.js");

const router = express.Router();

router.post("/create", createPolicyHolder);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get", Oauth, getPolicyHolder);

module.exports = router;
