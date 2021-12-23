const { Post } = require('../models')

const creatPost = async (req, res) => {
    try {

        const { title, content } = req.body;
        Post.create({
            creator: req.user.email,
            title,
            content,
        })
        res.status(200).json({
            code: 200,
            message: "게시글 게시 성공"
        })
    } catch (err) {
        console.error(err)
        res.status(404).json({
            code: 404,
            message: "게시글 게시 실패"
        })
    }
}

module.exports = {
    creatPost
}