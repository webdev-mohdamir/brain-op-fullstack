import mongoose from "mongoose";

const singlePostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
    comments: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posts: [singlePostSchema],
});

const Post = mongoose.model("Post", postSchema);
export default Post;
