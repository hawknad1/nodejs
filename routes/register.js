const express = require("express");
const router = express.Router();
const newAccountController = require("../controllers/registerController");

router.post("/", newAccountController.handleNewUser);
module.exports = router;
