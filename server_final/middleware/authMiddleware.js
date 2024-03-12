const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    // console.log("Middleware called");
    try {
        const token = (req.headers['authorization'].split(" ")[1]);
        // console.log(token);
        jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
            // console.log("decode", decode);
            if (error) {
                res.json({ message: "Invalid token", success: false })
                // console.log(error);
            } else {
                req.body.uid = decode.uid;
                req.body.uname = decode.uname;
                next();
            }
        })
    } catch (error) {

        res.json({ message: "Invalid user", success: false, error });
    }

}
module.exports = { authMiddleware };