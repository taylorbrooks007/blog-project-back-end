const db = require("../db/dbConfig.js");

const getAllBlogs = async (req,res) => {
  try {
    const allBlogs = await db.any("SELECT * FROM blogs");
    return {allBlogs};
  } catch (error) {
    return { error: error };
  }
};

const singleBlog = async (id) => {
  try {
    const blog = await db.one(`SELECT * FROM blogs WHERE id=${id}`);
    return {blog};
  } catch (error) {
    return { error: error };
  }
};

const createBlog = async (blog) => {
  try {
    const newBlog = await db.one(
      `INSERT INTO
        blogs(title, img_url, body, author, date_created, date_updated, is_fav)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *;`,
      [blog.title, blog.img_url, blog.body, blog.author, blog.date_created, blog.date_updated, blog.is_fav]
    );
    return {newBlog};
  } catch (error) {
    return { error: error };
  }
};

const deleteBlog = async (id) => {
  //blog/id
  try {
    const deletedBlog = await db.one(
      "DELETE FROM blogs WHERE id=$1 RETURNING *",
      id
    );
    return deletedBlog;
  } catch (e) {
    return e;
  }
};

const updateBlog = async (id, blog) => {
  // blogs/id
  try {
    const updatedBlog = await db.one(
      `UPDATE blogs SET title=$1, img_url=$2, body=$3, author=$4 date_updated=$5, is_fav=$6 WHERE id=$7 RETURNING *`,
      [blog.title, blog.img_url, blog.body, blog.author, blog.date_updated, blog.is_fav, id]
    );
    return updatedBlog;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getAllBlogs,
  singleBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
