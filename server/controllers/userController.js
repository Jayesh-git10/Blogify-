import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import imagekit from "../configs/imageKit.js";

export const userRegister = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.json({ success: false, message: "All fields are mandatory" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: "Email already registered" });

    //const hashedPass = await bcrypt.hash(password, 10);

    await User.create({ email, name, password });

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "Enter all fields" });

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const userAddBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    if (!title || !subTitle || !description || !category || isPublished === undefined) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const file = req.file;
    const buffer = fs.readFileSync(file.path);

    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: file.originalname,
      folder: "/blogs",
    });

    const image = imagekit.url({
      path: uploaded.filePath,
      transformation: [{ quality: "auto" }, { format: "webp" }, { width: "1280" }],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
      createdBy: req.user.id
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const userAddComment = async (req, res) => {
  try {
    const { blog, content, name } = req.body;

    if (!blog || !content) {
      return res.json({ success: false, message: "Blog and content required" });
    }

    const finalName = req.user ? req.user.name : name;

    const comment = await Comment.create({
      blog,
      name: finalName,
      content,
      userId: req.user.id,
    });

    res.json({ success: true, message: "Comment added", comment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const showComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const exists = await Blog.findById(blogId);
    if (!exists) return res.json({ success: false, message: "Blog not found" });

    const comments = await Comment.find({ blog: blogId });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const userDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const recentBlogs = await Blog.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const blogs = await Blog.countDocuments({ createdBy: userId });
    const comments = await Comment.countDocuments({ userId });
    const drafts = await Blog.countDocuments({
      createdBy: userId,
      isPublished: false,
    });


    res.json({
      success: true,
      dashboardData: { blogs, comments, drafts, recentBlogs },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
