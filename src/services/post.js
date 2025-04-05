const Post = require('../models/post')

module.exports = {
  getAllPosts: async () => {
    return await Post.find().sort({ createdAt: -1 })
  },

  getPostById: async (id) => {
    return await Post.findById(id)
  },

  createPost: async (postData) => {
    const post = new Post(postData)
    return await post.save()
  },

  updatePost: async (id, postData) => {
    return await Post.findByIdAndUpdate(id, postData, { new: true })
  },

  deletePost: async (id) => {
    return await Post.findByIdAndDelete(id)
  },

  getPostsByTag: async (tag) => {
    return await Post.find({ tags: tag }).sort({ createdAt: -1 })
  }
} 
