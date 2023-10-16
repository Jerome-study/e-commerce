const { userModel } = require('../config/database');
const { comparePassword } = require('../utils/bcrypt');


async function loginUser (req,res) {
    try {
        const { username, password } = req.body
        
        // Check if all credential is filled
        if (!username || !password ) {
            return res.send({message: "Please fill all the credential field"});
        }

        // Find username if exist in database
        const found = await userModel.findOne({ username: username});
        if (!found) {
            return res.send({message: "Username or Password is Wrong!"});
        }

        // Compare Password
        const isMatched = await comparePassword(password, found.password);

        // Verify if Correct
        if (found.username !== username || !isMatched ) {
            return res.send({message: "Username or Password is Wrong!"});
        }
        req.session.isAuth = true;
        req.session.user = found._id;
        res.send({success: "You are now logged In", user: req.session.user});
    } catch(error) {
       console.log(error.message);
    }
};

module.exports = { loginUser }