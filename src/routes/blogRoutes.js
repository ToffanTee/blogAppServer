const express = require("express");
const {
  createBlogs,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controllers/blogController");
const requireSignin = require("../middlewares/authenticate");
const { validateBlogData } = require("../middlewares/blogValidator");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

blogRouter.get("/:blogTitle", getSingleBlog);

blogRouter.post("/", requireSignin, validateBlogData, createBlogs);

blogRouter.put("/:blogId", requireSignin, updateBlog);

blogRouter.delete("/:blogId", requireSignin, deleteBlog);

module.exports = blogRouter;
