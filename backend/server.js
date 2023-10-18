const express = require("express");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/homeRoute");
const apiRoute = require("./routes/product");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { connectionString } = require("./config/database");
const MongoStore = require("connect-mongo")
const app = express();

app.use(express.json());
app.use(cookieParser());


// Environment Vairable
require('dotenv').config();


// Database Config
require('./config/database');



// Cookie Config
const cookieConfig = {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    sameSite: "lax",
    httpOnly: true
}

if (process.env.NODE_ENV == "production") {
    cookieConfig.secure = true
    cookieConfig.sameSite = "none"
}

// Cors Config
app.use(cors({
    origin: process.env.ORIGINURL || "http://localhost:5173",
    credentials: true
}));

const store = new MongoStore({
    mongoUrl: connectionString,
    collectionName: "session"
});

// Session
app.use(session({
    secret: process.env.SECRET || "some secret key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: cookieConfig
}));



// Authentication Route
app.use("/authentication", authRoute);
app.use("/home", homeRoute);
app.use("/api", apiRoute);
app.get("/isLoggedIn", (req,res) => {
    if (req.session.isAuth) {
        
        return res.send({status: true, user: req.session.user});
    }
    return res.send({status: false, user:null});
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(process.env.ORIGINURL);
    console.log(`Server is running on port ${port}`);
});