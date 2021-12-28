const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
require('dotenv').config();

// const salt = crypto.randomBytes(128).toString('base64');
const salt = 123
const sign_up = async (req, res, next) => {
    const { nickname, email, password } = req.body;
    const hashedPassword = crypto
        .createHash('sha512')
        .update(password + salt)
        .digest('hex');
    try {
        if (await User.findOne({ where: { nick: nickname } })) return res.status(409).json({ message: "중복된 닉네임" })
        if (await User.findOne({ where: { email: email } })) return res.status(409).json({ message: "중복된 이메일" });
        await User.create({
            nick: nickname,
            email,
            password: hashedPassword
        })
        res.status(200).json({
            message: "회원가입 성공"
        })
    } catch (err) {
        console.error(err);
        res.status(403).json({
            message: "회원가입 실패"
        })
    }
}

const login = async (req, res, next) => {
    const { nickname, email, password } = req.body;
    const hashedPassword = crypto
        .createHash('sha512')
        .update(password + salt)
        .digest('hex');
    try {
        if (! await User.findOne({ where: { email } })) return res.status(401).json({ message: "존재하지 않는 이메일" });
        const user = await User.findOne({ where: { email } });
        if (user.password !== hashedPassword) return res.status(401).json({ message: "비밀번호가 일치하지 않음" });
        const accessToken = jwt.sign({
            email,
            nickname
        }, process.env.JWT_KEY, {
            expiresIn: '1h'
        }
        );
        res.status(200).json({
            message: "로그인 성공",
            access_token: accessToken
        })
    } catch (err) {
        console.error(err)
        next()
    }
}

const test = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'success' });
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    sign_up,
    login,
    test
}