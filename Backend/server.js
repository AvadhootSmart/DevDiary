const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

const BlogModel = require("./models/Blog");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Working succesfully!!");
});

app.get("/Blogs", async (req, res) => {
  const Blogs = await BlogModel.find();
  if (!Blogs) {
    res.status(304).send("Couldnt fetch any data");
  }
  res.json(Blogs).status(200);
});

app.get("/Blog/:id", async (req, res) => {
  const id = req.params.id;
  const Blog = await BlogModel.findById(id);
  res.json(Blog).status(200);
});

app.get("EditBlog/:id", async (req, res) => {
  const id = req.params.id;
  const Blog = await BlogModel.findById(id);
  res.json(Blog).status(200);
});

app.get("/Admin/ViewAll", async (req, res) => {
  const Blogs = await BlogModel.find();
  if (!Blogs) {
    res.status(304).send("Couldnt fetch any data");
  }
  res.json(Blogs).status(200);
});

//POST Requests:
app.post("/Admin/AddBlog", async (req, res) => {
  try {
    const newBlog = new BlogModel({
      Title: req.body.title,
      Description: req.body.description,
      Preview: req.body.preview,
      Date: Date.now(),
    });

    await newBlog.save();

    // Send a successful response to the client
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog" });
  }
});

app.post("/Edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, preview } = req.body;
  res.json(req.body);
  try {
    await BlogModel.findByIdAndUpdate(
      id,
      { Title: title, Description: description, Preview: preview },
      { new: true }
    );
    // res.send(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.error("Error Updating the Blog", error);
    // res.send(500).json({ message: "Server Error" });
  }
});

app.delete("/Admin/RemoveBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const DeleteBlog = await BlogModel.findByIdAndDelete(id);

    if (!DeleteBlog) {
      return res.send(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error deleting the blog", error);
    res.send(500).json({ message: "Internal Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});

/* try {
    const title = req.body.title;
    const description = req.body.description;
    await BlogModel.create([{ Title: title, Description: description }]);

    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error("Error creating blog!!", error);
  } */
