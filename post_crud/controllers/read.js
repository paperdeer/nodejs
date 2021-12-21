const { Post } = require('../models');

const readAllWirterPosts = async (req, res) => {
    const { writer } = req.body;
    try {
        const posts = await Post.findAll({ where: { writer: writer } })
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({
            message: "데이터가 없음"
        })
        console.error(err)
    }
}

const readOnePost = async (req, res) => {
    const { id } = req.body;
    try {
        const post = await Post.findOne({ where: { id: id } });
        if (post === null) res.status(404).json({ message: "데이터를 찾을 수 없음" })
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({
            message: "데이터가 없음"
        });
        console.error(err)
    }
}

const ReadAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({
            message: "게시물 없음"
        })
        console.error(err)
    }
}

module.exports = {
    readAllWirterPosts,
    readOnePost,
    ReadAllPosts
}