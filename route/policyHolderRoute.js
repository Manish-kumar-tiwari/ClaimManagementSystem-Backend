const express = require("express");
const {
  createPolicyHolder,
  getPolicyHolder,
  login,
} = require("../controlers/policyHolderControler.js");
const { Oauth } = require("../middlewares/Oauth.js");

const router = express.Router();

router.post("/create", createPolicyHolder);
router.post("/login", login);
// Logout Functionality :-
router.get("/get", Oauth, getPolicyHolder);

module.exports = router;
