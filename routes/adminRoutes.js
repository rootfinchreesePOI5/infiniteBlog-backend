import express from 'express'
import { LoginAdmin, getAllusers, removeUser, getAllposts, removePost, getNotifications } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
//define adminRoutes
const adminRoutes = express.Router()

adminRoutes.post('/login' , LoginAdmin)//login
adminRoutes.post('/get-user' , getAllusers) // see all users and their credentials 
adminRoutes.post('/remove-user', authAdmin,removeUser)//remove-user & notify
adminRoutes.post('/all-posts' , getAllposts) // see all posts
adminRoutes.post('/remove-post', removePost) //remove-post & notify
adminRoutes.post('/notifications', getNotifications) // send notifications

export default adminRoutes