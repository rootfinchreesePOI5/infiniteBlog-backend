import express from "express";
import { upload } from "../middlewares/multer.js";
import { RegisterUser, LoginUser, getProfile, addPost, updateProfile, GetAllPosts, MyPosts, updatePost, removePost, savePost, Getsavedposts, removeSavedPost, addComment, GetComments, getMyFollowers, getUsers, getuserDetails,unfollowUser, removeAccount} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
//define userRoutes
const userRoutes = express.Router();

userRoutes.post("/login", LoginUser); //login
userRoutes.post("/register", upload.single("image"), RegisterUser); //register and upload image
userRoutes.get('/profile', authUser , getProfile)
userRoutes.post("/remove-login", authUser, removeAccount); //remove my account
userRoutes.post("/update-profile",upload.single("image"),authUser,updateProfile ); //update my profile
userRoutes.post("/add-posts", upload.single("image"), authUser, addPost); //add a post
userRoutes.post("/all-posts", GetAllPosts); //see all users post except their credentials
userRoutes.post("/my-posts", MyPosts); //see ur posts
userRoutes.post("/update-posts", upload.single("image"), authUser, updatePost); //update my posts
userRoutes.post("/remove-posts", removePost); //remove my posts
userRoutes.post("/save-post", savePost); //save your post and other posts
userRoutes.post("/remove-saved-post", removeSavedPost);
userRoutes.post("/comment", addComment); //add a comment
userRoutes.post("/all-comments", GetComments); // view all comments on a my posts
userRoutes.post("/followers", getMyFollowers); //see my followers
userRoutes.post("/see-users", getUsers); // see people to follow from the website add a search function
userRoutes.post("/followers", getuserDetails); //except there credentials
userRoutes.post("/unfollow", unfollowUser); //remove someone from your follow group

export default userRoutes;
