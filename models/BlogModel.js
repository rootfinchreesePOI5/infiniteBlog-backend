import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "Select Image",
  },
  title: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: new Date(),
    default: '',
  },
  url: {
    type: Number,
    default: '',
  },
});

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default blogModel;
