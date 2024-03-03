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






// const express = require('express');
// const app = express();
// const router = require('./routes/allRuotes');
// const dotenv = require('dotenv');
// // const http = require('http');
// // const socketIo = require('socket.io');
// dotenv.config();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// // const bcrypt = require('bcrypt');
// const cors = require('cors');
// // const server = http.Server(app);
// // const io = socketIo(server);

// // const express = require('express');
// // const cors = require('cors');
// // // const app = express();
// // const router = require('./routes/allRuotes'); // Correct the typo in your route file path
// // const dotenv = require('dotenv');
// // // const http = require('http').Server(app);
// // // const io = require('socket.io')(http);
// // const http = require('http');
// // const { Server } = require('socket.io');

// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server);

// // io.on('connection', (socket) => {
// //  console.log('a user connected');
// // });
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const User = require('../server/models/user');

// dotenv.config();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("Connected to DB"))
//   .catch((error) => console.error("Error connecting to MongoDB:", error));

// // Setting up middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(router);

// app.get("/", (req, res) => {
//   res.send("Node JS Application");
// });

// // function generateOTP() {
// //   return Math.floor(1000 + Math.random() * 9000);
// // }

// // When a user logs in
// // app.put('/getotp', async (req, res) => {
// //   try {
// //     const user = await User.findOneAndUpdate(
// //       { userId: req.body.userId },
// //       { $set: { password: generateOTP() } },
// //       { new: true }
// //     );

// //     // Store the OTP and userId in a variable
// //     const otpData = {
// //       userId: user.userId,
// //       otp: user.password
// //     };

// //     // Send the OTP to the admin panel
// //     io.emit('new_otp', otpData);

// //     res.status(200).send({ status: 'success', message: 'OTP generated' });
// //   } catch (error) {
// //     console.error("Error generating OTP:", error);
// //     res.status(500).send({ status: 'error', message: 'Internal Server Error' });
// //   }
// // });

// const start = async () => {
//     try {
//         app.listen(process.env.PORT, () => {
//             console.log(`Start ${process.env.APPLICATION_MODE} in Port: ${process.env.PORT}`);
//             // console.log( require("crypto").randomBytes(35).toString("hex"));
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// start();

