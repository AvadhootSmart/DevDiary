const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://avadhootsmart14:Magnetic@blogscluster.oijg7ad.mongodb.net/?retryWrites=true&w=majority");

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
    type:Date,
  },
});

module.exports = mongoose.model("Blogs", BlogSchema);
