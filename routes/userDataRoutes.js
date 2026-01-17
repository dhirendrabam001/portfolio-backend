const express = require("express");
const router = express.Router();

const userDataController = require("../controller/userDataController");

router.post("/userData", userDataController);

module.exports = router;
