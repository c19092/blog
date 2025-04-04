const express = require('express')
const router = express.Router()
const postService = require('../services/post')

router.get('/', async (req, res) => {
  const posts = await postService.getAllPosts()
  res.render('index', { posts })
})

router.get('/post/new', (req, res) => {
  res.render('new')
})

router.post('/post', async (req, res) => {
  const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
  await postService.createPost({
    title: req.body.title,
    body: req.body.body,
    tags
  })
  res.redirect('/')
})

router.get('/post/:id', async (req, res) => {
  const post = await postService.getPostById(req.params.id)
  res.render('show', { post })
})

router.get('/post/:id/edit', async (req, res) => {
  const post = await postService.getPostById(req.params.id)
  res.render('edit', { post })
})

router.post('/post/:id', async (req, res) => {
  const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
  await postService.updatePost(req.params.id, {
    title: req.body.title,
    body: req.body.body,
    tags
  })
  res.redirect(`/post/${req.params.id}`)
})

router.post('/post/:id/delete', async (req, res) => {
  await postService.deletePost(req.params.id)
  res.redirect('/')
})

router.get('/tag/:tag', async (req, res) => {
  const posts = await postService.getPostsByTag(req.params.tag)
  res.render('index', { posts, currentTag: req.params.tag })
})

module.exports = router 