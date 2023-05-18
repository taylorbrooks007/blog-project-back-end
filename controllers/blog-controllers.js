const express = require("express");
const blogs = express.Router();
const {
  getAllBlogs,
  singleBlog,
  newBlog,
  deleteBlog,
  updateBlog,
} = require("../queries/blogs.js");

// index
blogs.get("/", async (req, res) => {
  //http://localhost:5001/blogs
  const allBlogs = await getAllBlogs();
  if (!allBlogs.error) {
    res.status(200).json(allBlogs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// show
blogs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneBlog = await singleBlog(id);
  res.json(oneBlog);
});

// create
blogs.post(
  "/",
  (req, res, next) => {
    // validate req.body
    const { title, img_url, body, author, date_created } = req.body;
    if (!title || !img_url || !body || !author || !date_created) {
      return res.status(404).json({
        error: "body requires title, img_url, body, author, and date created",
      });
    }

    next();
  },
  async (req, res) => {
    const { title, img_url, body, author, date_created } = req.body;

    const newBookmark = await createBookmark({
      title,
      img_url,
      body,
      author,
      date_created,
    });
    if (!newBlog.error) {
      res.status(201).json(newBlog);
    } else {
      res.status(500).json({ error: "server error" });
    }
  }
);

// update bookmark
blogs.put("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = req.body;
  const updatedBlog = await updateBlog(id, blog);
  res.status(200).json(updatedBlog);
});

blogs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await deleteBlog(id);
  if (deletedBlog.id) {
    res.status(201).json(deletedBlog);
  } else {
    res.status(404).json("Blog not found");
  }
});

module.exports = blogs;
