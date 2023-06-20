//all handler for our routes
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    //find will take time to complete that's why async await func
    //sort({_id:-1}): new post come first
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    return res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i"); //i for case insencetive

    const post = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //req coming from front end
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const newPost = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this Id");

  //update id
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...newPost, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this Id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post delted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticate Action" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this Id");

  const post = await PostMessage.findById(id);

  // check whether this id already like post or not
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like functionality
    post.likes.push(req.userId);
  } else {
    // dislike functionality
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
