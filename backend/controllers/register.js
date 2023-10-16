const { userModel, userCommerceModel } = require('../config/database');
const { generateHashPassword } = require('../utils/bcrypt');
require('dotenv').config();

async function registerUser (req,res) {
    try {
        const { username, password,confirmPassword,street,district,barangay,province } = req.body
        const address = {
            street,
            district,
            barangay,
            province
        }
        // Check if all credential is filled
        if (!username || !password || !confirmPassword) {
            return res.send({message: "Please fill all the credential field"});
        }

        // Find username if exist in database
        const found = await userModel.findOne({ username: username});
        if (found) {
            return res.send({message: "Username cannot be used!"});
        }

        if (password !== confirmPassword) {
            return res.send({message: "password do not match!"});
        }
        
        if (!street || !district || !barangay || !province) {
            address.street = ""
            address.district = ""
            address.barangay = ""
            address.province = ""
        }

        // Create Hash Password
        const hashedPassword = await generateHashPassword(password);

        // Create User Model
        const newUser = new userModel({
            username: username,
            password: hashedPassword,
            address: address
        });
        // Create Commerce Model
        const newUserCommerce = new userCommerceModel({
            user_id: newUser._id,
            username: newUser.username,
            address: !newUser.address? {}: newUser.address,
            selling: [],
            buying: [],
            inCart: []
        });
        
        // Save Models
        await newUser.save();
        await newUserCommerce.save();

        res.send({success: "You are now registered"});
    } catch(error) {
       console.log(error.message);
    }
};

module.exports = { registerUser }