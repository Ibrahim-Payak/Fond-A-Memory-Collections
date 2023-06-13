import mongoose from "mongoose";

// create mongoose schema
const postSchema = mongoose.Schema({
  // have to have this things
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String], //to tract like by which id
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//create model from schema
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
