const router = require('express')()
const createPost = require('./create');
const readPost = require('./read')
const deletePost = require('./delete');
const updatePost = require('./update');

router.use("/post", createPost, readPost, deletePost, updatePost);

module.exports = router;