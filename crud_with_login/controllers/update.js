const { Post } = require('../models')

const update = async (req, res) => {
    const { content, title, id } = req.body;
    try {
        Post.update({
            title,
            content
        }, {
            where: { creator: req.user.email, id }
        })
        res.status(200).json({
            code: 200,
            message: "수정 성공!"
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    update
}