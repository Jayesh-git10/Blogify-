import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import userAuth from '../middleware/userAuth.js';
import { userAddBlog } from '../controllers/userController.js';


const blogRouter = express.Router();
 
blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.post('/userAdd', upload.single('image'), userAuth, userAddBlog);

blogRouter.post('/generate', auth, generateContent);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);

blogRouter.get('/all', getAllBlogs);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);

/** ALWAYS PLACE LAST **/
blogRouter.get('/:blogId', getBlogById); 

export default blogRouter