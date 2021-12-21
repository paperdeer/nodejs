const { Post } = require("../models");

const updatePost = async (req, res) => {
    const { id, title, content, filed } = req.body;
    try {
        await Post.update({
            title: title,
            content: content,
            filed: filed
        }, {
            where: { id: id }
        })
        res.status(200).json({
            message: "수정 성공"
        })
    } catch (err) {
        res.status(404).json({
            message: "해당 게시글 없음"
        })
        console.error(err)
    }
}

module.exports = {
    updatePost
}