import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/UserModel.js";
// Register a new user
const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const imageFile = req.file;
    if (!imageFile || !username || !email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Missing Details" });
    }
    //the image storing
    //upload to cloudinary
    const imageupload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageupload.secure_url;

    //getting the email and validating it and hasshing the password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a Valid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Enter a Strong Password (min 8 characters)",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    // Create user object
    const userInfo = {
      image: imageUrl,
      username,
      email,
      password: passwordHashed,
    };

    // Save to database
    const newUser = new userModel(userInfo);
    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(201)
      .json({ success: true, token, message: "SUBSCRIBED!" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// User login
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    //password checking
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, message: "Log In Successfull" });
    } else {
      res.json({ success: false, message: "Wrong Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeAccount = async (req, res) => {
  try {
    // Logic for unfollowing a user
  } catch (error) {
    // Handle errors related to unfollowing a user
  }
};

// Get user profile information
const getProfile = async (req, res) => {
  try {
    // Fetch user details based on authentication
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    return res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user profile information
const updateProfile = async (req, res) => {
  try {
    // Logic for updating user details
    const { userId, username, email } = req.body;
    const imageFile = req.file;
    if (!username || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    console.log("Updating user with ID:", userId);
    await userModel.findByIdAndUpdate(userId, {
      username,
      email,
    });

    if (imageFile) {
      //upload to cloudinary
      const imageupload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageupload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "profile updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new post
const addPost = async (req, res) => {
  try {
    // Logic for creating a new post
  } catch (error) {
    // Handle errors related to adding a post
  }
};

// Get all posts
const GetAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
  } catch (error) {
    // Handle errors related to fetching posts
  }
};

// Get posts created by the logged-in user
const MyPosts = async (req, res) => {
  try {
    // Fetch posts specific to the logged-in user
  } catch (error) {
    // Handle errors related to fetching user's posts
  }
};

// Update a specific post
const updatePost = async (req, res) => {
  try {
    // Logic for updating a post
  } catch (error) {
    // Handle errors related to updating a post
  }
};

// Remove a specific post
const removePost = async (req, res) => {
  try {
    // Logic for deleting a post
  } catch (error) {
    // Handle errors related to deleting a post
  }
};

// Save a post for later
const savePost = async (req, res) => {
  try {
    // Logic for saving a post (bookmarking)
  } catch (error) {
    // Handle errors related to saving a post
  }
};

// Get all saved (bookmarked) posts
const Getsavedposts = async (req, res) => {
  try {
    // Fetch saved posts of the logged-in user
  } catch (error) {
    // Handle errors related to fetching saved posts
  }
};

// Remove a saved (bookmarked) post
const removeSavedPost = async (req, res) => {
  try {
    // Logic to remove a saved post from bookmarks
  } catch (error) {
    // Handle errors related to removing a saved post
  }
};

// Add a comment to a post
const addComment = async (req, res) => {
  try {
    // Logic for adding a comment to a post
  } catch (error) {
    // Handle errors related to adding a comment
  }
};

// Get all comments for a post
const GetComments = async (req, res) => {
  try {
    // Fetch comments for a specific post
  } catch (error) {
    // Handle errors related to fetching comments
  }
};

// Get the list of followers for the logged-in user
const getMyFollowers = async (req, res) => {
  try {
    // Fetch users following the logged-in user
  } catch (error) {
    // Handle errors related to fetching followers
  }
};

// Get a list of all users
const getUsers = async (req, res) => {
  try {
    // Fetch all registered users
  } catch (error) {
    // Handle errors related to fetching users
  }
};

// Get details of a specific user
const getuserDetails = async (req, res) => {
  try {
    // Fetch user details by user ID
  } catch (error) {
    // Handle errors related to fetching user details
  }
};

// Unfollow a specific user
const unfollowUser = async (req, res) => {
  try {
    // Logic for unfollowing a user
  } catch (error) {
    // Handle errors related to unfollowing a user
  }
};

export {
  RegisterUser,
  LoginUser,
  getProfile,
  addPost,
  updateProfile,
  GetAllPosts,
  MyPosts,
  updatePost,
  removePost,
  savePost,
  Getsavedposts,
  removeSavedPost,
  addComment,
  GetComments,
  getMyFollowers,
  getUsers,
  getuserDetails,
  unfollowUser,
  removeAccount,
};
