const express = require("express");
const router = express.Router();

const {RegisterUser,LoginUser,GetUserByUsername} = require("../controllers/userControllers");

router.post("/register-user",RegisterUser);
router.post("/login",LoginUser);
router.get("/getuser/:username",GetUserByUsername);

module.exports = router;