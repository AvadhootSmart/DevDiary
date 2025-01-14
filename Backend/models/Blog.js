const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const BlogSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Content: {
        type: Object,
        required: true,
    },
    Preview: {
        type: String,
    },
    Date: {
        type: Date,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
});

module.exports = mongoose.model("Blogs", BlogSchema);
