const express = require("express");
const { calculated } = require("../controllers/actions");

const router = express.Router();

router.get("/calculate", calculated);

module.exports = router;
