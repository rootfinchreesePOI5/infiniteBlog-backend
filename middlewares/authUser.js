import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

//user auth middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      console.log("No token provided");
      return res.json({
        success: false,
        message: "Not authorized. Login again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Decoded:", token_decode); // Check if the token is valid

    req.body.userId = token_decode.id;
    console.log("User ID Set:", req.body.userId); // Ensure userId is being assigned

    const user = await userModel.findById(token_decode.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log("JWT Verification Error:", err);
    res.json({ success: false, message: err.message });
  }
};

export default authUser;
