const { User } = require("../models");

const sign_up = (req, res) => {
    const { id, age, name } = req.body;
    try {
        User.create({
            id,
            age,
            name,
        });
        console.log(req.body)
        res.status(200).json({
            message: "성공",
        });
    } catch (err) {
        res.status(409).json({
            message: "중복된 아이디"
        });
        console.error(err);
    }
};

module.exports = {
    sign_up
};