const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
const { userCommerceModel, userModel } = require("../config/database");
router.put("/", isAuth, async (req,res) => {
    try {
        // Find user
        const users = await userCommerceModel.find();
        const user = await userCommerceModel.findOne({ user_id: req.session.user });
        const exist = users.find( user => user.username === req.body.username && user.user_id !== req.session.user);
        const userAccount = await userModel.findOne({ _id: req.session.user });

        if (exist) {
            return res.send({ message: "This username is already taken!", exist: true});
        }
        
        user.username = user.username == req.body.username? user.username: req.body.username;
        user.address.street = user.address.street == req.body.street?user.address.street: req.body.street;
        user.address.district = user.address.district == req.body.district? user.address.district: req.body.district;
        user.address.barangay =user.address.barangay == req.body.barangay? user.address.barangay: req.body.barangay;
        user.address.province = user.address.province == req.body.province? user.address.province: req.body.province;
        userAccount.username = userAccount.username == req.body.username? userAccount.username: req.body.username;


        user.markModified("address");
        await user.save();
        await userAccount.save();
        res.send({ success: true });
        
    } catch(error) {
        console.log(error.message);
    }
});

module.exports = router;