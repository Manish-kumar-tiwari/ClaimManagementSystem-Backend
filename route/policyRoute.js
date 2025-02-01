const express = require("express");
const router = express.Router();
const {
  createPolicyControler,
  getPolicyControler,
} = require("../controlers/policyControler");
const { Oauth } = require("../middlewares/Oauth");

router.post("/create", Oauth, createPolicyControler);
router.get("/get/:id", getPolicyControler);


module.exports = router;
