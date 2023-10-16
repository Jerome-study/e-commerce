const express = require("express");
require('dotenv').config();
const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
const { userCommerceModel } = require("../config/database");


router.get("/:id", isAuth, async (req,res) => {

    if (req.params.id !== req.session.user) {
        return res.status(404).send({message: "Hey who the hell are you?"});
    }

    const found = await userCommerceModel.findOne({user_id: req.params.id});
    if(!found) {
        return res.send({message: "Hey who are you?"});
    }

    res.send({user: found});
})

module.exports = router;