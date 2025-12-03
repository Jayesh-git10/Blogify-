import express from 'express'
import { showComments, userAddBlog, userAddComment, userDashboard, userLogin, userRegister } from '../controllers/userController.js'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/add-comment',userAuth,userAddComment)
userRouter.get('/show-comment/:blogId',userAuth,showComments)
userRouter.get('/showDashboard',userAuth ,userDashboard)

export default userRouter