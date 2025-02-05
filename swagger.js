const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Claim Management System",
    description: "This is showing my all APIs",
  },
  host: "localhost:5080",
};

const outputFile = "./swagger-output.json";
const routes = ["./index.js"];


swaggerAutogen(outputFile, routes, doc);
