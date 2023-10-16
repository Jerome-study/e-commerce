const mongoose = require("mongoose");

const connectionString = process.env.MONGOURL;

mongoose.connect(connectionString).then((res) => {
    console.log("Connected to database");
}).catch((err) => console.log(err));


// Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Object,
    }
});

// Address Schema


const userCommerceSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    address: {
        type: Object,
    },
    selling: {
        type: Array
    },
    buying: {
        type: Array
    },
    inCart: {
        type:Array
    }
});

const userModel = mongoose.model("accounts", userSchema);
const userCommerceModel = mongoose.model("commerce_accounts", userCommerceSchema);

module.exports = { userModel, userCommerceModel, connectionString};