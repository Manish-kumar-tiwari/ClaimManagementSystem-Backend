const express = require("express");
const { connectDb } = require("./config/connectDb");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerDocument = require("./swagger-output.json");
const swaggerUi = require("swagger-ui-express");
const app = express();
const policyHolderRoute = require("./route/policyHolderRoute");
const policyRoute = require("./route/policyRoute");
const claimRoute = require("./route/claimRoute");
dotenv.config();

const corsOptions = {
  origin: "*", // Change this to your frontend URL
  credentials: true, // Allow cookies & authentication headers
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Serve Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/policyHolder", policyHolderRoute);
app.use("/api/v1/policy", policyRoute);
app.use("/api/v1/claim", claimRoute);

app.listen(process.env.port, async () => {
  try {
    await connectDb();
    console.log(`Server is running on port ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
