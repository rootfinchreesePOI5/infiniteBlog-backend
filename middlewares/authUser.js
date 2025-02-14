import jwt from 'jsonwebtoken'

//user auth middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            console.log("No token provided");
            return res.json({ success: false, message: "Not authorized. Login again." });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Decoded:", token_decode);  // Check if the token is valid

        req.body.userId = token_decode.id;
        console.log("User ID Set:", req.body.userId);  // Ensure userId is being assigned

        next();
    } catch (err) {
        console.log("JWT Verification Error:", err);
        res.json({ success: false, message: err.message });
    }
};


export default authUser