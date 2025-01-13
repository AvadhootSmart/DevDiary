const express = require("express");
const cors = require("cors");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const app = express();
const PORT = 5000;

const BlogModel = require("./models/Blog");
const UserModel = require("./models/Users");

//Cors:
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.PROD_URL,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   }),
// );

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await UserModel.findOne({ Username: username });

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      if (user.Password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    secret: "jai Shree Ram",
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Backend Working succesfully!!");
});

//Authentication:

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: `${process.env.PROD_URL}/Auth`,
  }),
  function (req, res) {
    const { _id, Username } = req.user;
    res.status(200).json({ Username, _id });
  },
);

app.post("/register", async (req, res) => {
  const existingUser = await UserModel.findOne({ Username: req.body.username });

  if (existingUser) {
    return res
      .status(201)
      .json({ message: "Username already taken", Username: existingUser });
  }
  const newUser = new UserModel({
    Username: req.body.username,
    Password: req.body.password,
  });

  await newUser.save();
  res.status(200).json({ Username: req.body.username });
});

//APIs:
app.get("/blogs", async (req, res) => {
  try {
    const Blogs = await BlogModel.find().populate("User");
    if (!Blogs || Blogs.length === 0) {
      return res.status(304).send("Couldn't fetch any data");
    }
    res.status(200).json(Blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

//From Editor/ViewAll
app.get("/:id/blogs", async (req, res) => {
  const Id = req.params.id;
  const User = await UserModel.findById(Id).populate("Blogs");

  res.json({ Blogs: User.Blogs });
});

//From Home
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

/**
 
app.get("/Admin/ViewAll", async (req, res) => {
  const Blogs = await BlogModel.find();
  if (!Blogs) {
    res.status(304).send("Couldnt fetch any data");
  }
  res.json(Blogs).status(200);
});

 */

//POST Requests:
app.post("/:id/AddBlog", async (req, res) => {
  try {
    const UserId = req.params.id;

    const newBlog = new BlogModel({
      Title: req.body.title,
      Description: req.body.description,
      Preview: req.body.preview,
      Date: Date.now(),
      User: UserId,
    });

    const savedBlog = await newBlog.save(); // Save the new blog

    await UserModel.findByIdAndUpdate(UserId, {
      $push: { Blogs: savedBlog._id },
    });
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
    res.send(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.error("Error Updating the Blog", error);
    res.send(500).json({ message: "Server Error" });
  }
});

app.delete("/Editor/RemoveBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const DeleteBlog = await BlogModel.findByIdAndDelete(id);

    if (!DeleteBlog) {
      return res.sendStatus(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error deleting the blog", error);
    res.send(500).json({ message: "Internal Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});
