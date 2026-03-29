/**
 * Vercel serverless entry: semua request diarahkan ke Express (lihat vercel.json).
 */
const serverless = require("serverless-http");
const app = require("../server");

module.exports = serverless(app);
