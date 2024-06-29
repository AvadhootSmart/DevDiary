const express = require("express");
const cors = require("cors");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const app = express();
const PORT = 5000;

const BlogModel = require("./models/Blog");
const UserModel = require("./models/Users");

passport.use(
  new LocalStrategy(function (Username, Password, done) {
    UserModel.findOne({ Username: Username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(Password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }),
);

//Authentication:

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  },
);


//Cors:
app.use(
  cors({
    origin: process.env.URI,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Working succesfully!!");
});

//APIs:
app.get("/blogs", async (req, res) => {
  try {
    const Blogs = await BlogModel.find();
    if (!Blogs || Blogs.length === 0) {
      return res.status(304).send("Couldn't fetch any data");
    }
    res.status(200).json(Blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
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
      { new: true },
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
