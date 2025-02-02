const express = require("express");
const router = express.Router();
const {
  createPolicyControler,
  getPolicyControler,
  getAllPolicy,
} = require("../controlers/policyControler");
const { Oauth } = require("../middlewares/Oauth");

router.post("/create", Oauth, createPolicyControler);
router.get("/get/:id", Oauth, getPolicyControler);
router.get("/getAll", Oauth, getAllPolicy);

module.exports = router;
