const app = require("../server/index").default;
const serverless = require("serverless-http");

module.exports = serverless(app);
