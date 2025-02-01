const express = require("express");
const router = express.Router();

const {
  createClaimControler,
  getClaimControler,
  updateClaimControler,
  deleteClaimControler
} = require("../controlers/claimControler");

router.post("/create/:id", createClaimControler);
router.get("/get/:id", getClaimControler);
router.put("/update/:id", updateClaimControler);
router.delete("/delete/:id", deleteClaimControler);
module.exports = router;
