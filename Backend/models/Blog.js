const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const BlogSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Preview: {
    type: String,
  },
  Date: {
    type: Date,
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Blogs", BlogSchema);
