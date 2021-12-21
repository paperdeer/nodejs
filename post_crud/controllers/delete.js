const { Post } = require("../models");

const deleteOne = async (req, res) => {
    const { id } = req.body;
    try {
        await Post.destroy({ where: { id: id } });
        res.status(200).json({
            message: "게시글 삭제 성공"
        })
    } catch (err) {
        res.status(404).json({
            message: "잘못된 요청"
        })
        console.error(err)
    }
}

const deleteAll = async (req, res) => {
    try {
        await Post.destroy({ where: {}, truncate: true });
        res.status(200).json({
            message: "게시글 전부 삭제"
        });
    } catch (err) {
        res.status(404).json({
            message: "잘못된 요청"
        })
        console.error(err);
    }
}

module.exports = {
    deleteOne,
    deleteAll
}