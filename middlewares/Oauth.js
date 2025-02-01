const jwt = require("jsonwebtoken");

const Oauth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(400).send({
        success: false,
        message: "Token not found",
      });
    }

    const decoded = await jwt.verify(token, process.env.jwtSecret);
    req.policyHolderId = decoded.id;

    next();
  } catch (error) {
    console.log("Error in Oauth");
  }
};

module.exports = { Oauth };
