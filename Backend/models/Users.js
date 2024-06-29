const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
  },
  Password: {
    type: String,
  },
  Blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blogs",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
