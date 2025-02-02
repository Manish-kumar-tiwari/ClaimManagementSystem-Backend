const express = require("express");
const router = express.Router();

const {
  createClaimControler,
  getClaimControler,
  updateClaimControler,
  deleteClaimControler,
} = require("../controlers/claimControler");
const { Oauth } = require("../middlewares/Oauth");

router.post("/create/:id", Oauth, createClaimControler);
router.get("/get/:id", Oauth, getClaimControler);
router.put("/update/:id", Oauth, updateClaimControler);
router.delete("/delete/:id", Oauth, deleteClaimControler);
module.exports = router;
