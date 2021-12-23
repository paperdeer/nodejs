const { Post } = require('../models');

const readOne = async (req, res) => {
    const { id } = req.body;
    try {
        const post = await Post.findOne({ where: { creator: req.user.email, id } })
        res.status(200).json({
            code: 200,
            post: post
        })
    } catch (err) {
        console.log(err)
    }
}

const readAll = async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { creator: req.user.email } })
        res.status(200).json({
            code: 200,
            posts: posts
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    readOne,
    readAll
}