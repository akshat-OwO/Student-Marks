const express = require("express");
const { marks, scores } = require("../controllers/actions");

const router = express.Router();

router.post("/marks", marks);

router.post("/scores", scores);

module.exports = router;
