const express = require('express');
const app = express();
const server = require('http').Server(app);
const router = require('./routes/allRuotes');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const cors = require('cors');


// MongoDB
mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("Connected to DB"))
    .catch((error) => console.log(error));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
    res.send("Node JS Application");

});

const start = async () => {
    try {
        server.listen(process.env.PORT, () => {
            console.log(`Start ${process.env.APPLICATION_MODE} in the Port: ${process.env.PORT}`);
            // console.log( require("crypto").randomBytes(35).toString("hex"));
        });
    } catch (error) {
        console.log(error);
    }
}
start();
