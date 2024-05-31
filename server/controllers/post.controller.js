import mongoose from "mongoose";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// export const fetchAllPostsController = async (req, res) => {
//   try {
//     const posts = await Post.find({});

//     res.status(200).json({ posts: posts, count: posts.length });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const fetchPostsController = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const user = await User.findOne({ _id: user_id });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const posts = await Post.findOne({
      user_id: user._id,
    });

    if (!posts) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ posts: posts.posts, count: posts.posts.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createPostController = async (req, res) => {
  try {
    const { user_id, postData } = req.body;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!postData) {
      return res.status(400).json({ message: "Invalid postData format" });
    }

    const { description, image } = postData;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const existPost = await Post.findOne({ user_id });

    if (!existPost) {
      const createPost = await Post.create({
        user_id,
        posts: [
          {
            description,
            image,
          },
        ],
      });
      const post = createPost.posts.at(-1);
      return res.status(200).json({ post: post });
    } else {
      const updatePost = await Post.updateOne(
        { user_id },
        { $push: { posts: { description, image } } }
      );
      const post = updatePost.posts.at(-1);
      return res.status(200).json({ post: post });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
