const express = require("express");
require('dotenv').config();
const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
const { registerUser } = require("../controllers/register");
const { loginUser } = require("../controllers/login");
router.post("/login", (req,res) => {
    loginUser(req,res);
});

router.post("/logout", isAuth, (req,res) => {
    req.session.destroy();
    res.send({success: true});
});

router.post("/register", (req,res) => {
    registerUser(req,res)
});


module.exports = router;