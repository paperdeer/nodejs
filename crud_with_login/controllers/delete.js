const { Post } = require('../models');

const deleteOne = async (req, res) => {
    const { id } = req.body;
    try {
        Post.destroy({ where: { id, creator: req.user.email } })
        res.status(200).json({
            code: 200,
            message: "삭제 성공"
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteAll = async (req, res) => {
    try {
        Post.destroy({ where: { creator: req.user.email } })
        res.status(200).json({
            code: 200,
            message: "전체 삭제 성공"
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    deleteOne,
    deleteAll
}