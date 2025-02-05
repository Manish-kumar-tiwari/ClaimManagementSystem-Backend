const jwt = require("jsonwebtoken");

const Oauth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(400).send({
        success: false,
        message: "You are not login",
      });
    }

    const decoded = await jwt.verify(token, process.env.jwtSecret);

    if (!decoded) {
      return res.status(400).send({
        success: false,
        message: "You are not login",
      });
    }
    req.policyHolderId = decoded.id;

    next();
  } catch (error) {
    console.log("Error in Oauth");
  }
};

module.exports = { Oauth };
