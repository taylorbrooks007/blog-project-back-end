const express = require("express");
const blogs = express.Router();
const {
  getAllBlogs,
  singleBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../queries/blogs.js");

// index
blogs.get("/", async (req, res) => {
  //http://localhost:5001/blogs
  const {error, allBlogs} = await getAllBlogs();
  console.log(allBlogs)
  if (error) {
   return  res.status(500).json({ error : error });
  } else {
   return  res.status(200).json(allBlogs);
  }
});

// show
blogs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const {error, blog} = await singleBlog(id);
  if (error) {
    return res.status(500).json({ error: "server error" });
  } else {
   return res.status(200).json(blog);
  
  }
});

// create
blogs.post(
  "/",
  async (req, res) => {
    const blog = req.body 
    const {error, newBlog} = await createBlog(blog);
      if (error) {
        return res.status(500).json({ error : "server error"});
      } else {
        return res.status(200).json(blog);
      }
  },


  async (req, res) => {
    const { title, img_url, body, author, date_created } = req.body;

    const newBookmark = await createBlog({
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
