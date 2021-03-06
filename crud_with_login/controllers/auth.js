const db = require('../models')
const { User, RefreshToken } = db;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/authconfig.json')
require('dotenv').config();

const salt = 123

const signUp = async (req, res) => {
    const { nickname, email, age, password } = req.body;
    try {
        if (await User.findOne({ where: { nickname } })) return res.status(409).json({
            code: 409,
            message: "이미 존재하는 닉네임입니다."
        })
        if (await User.findOne({ where: { email } })) return res.status(409).json({
            code: 409,
            message: "이미 존재하는 이메일입니다."
        })
        const hashedpassword = crypto
            .createHash('sha512') // 암호화할 알고리즘  
            .update(password + salt) // 암호화 할 비밀번호
            .digest('hex') // 인코딩 방식 지정
        await User.create({
            nickName: nickname,
            email,
            age,
            password: hashedpassword
        })
        res.status(200).json({
            code: 200,
            message: "회원가입 성공"
        })
    } catch (err) {
        console.error(err)
        res.status(404).json({
            code: 409,
            message: '회원가입 실패'
        })
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = crypto
            .createHash('sha512')
            .update(password + salt)
            .digest('hex')
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(409).json({
            code: 409,
            message: "해당 유저가 없습니다"
        })
        if (user.password === hashedPassword) {
            const accessToken = jwt.sign({
                email,
                password
            }, process.env.JWT_KEY, {
                expiresIn: config.jwtAcessExpiration
            })
            const refreshToken = await RefreshToken.createToken(user);
            res.status(200).json({
                message: "로그인 성공",
                access_token: accessToken,
                refresh_token: refreshToken
            })
        }
    } catch (err) {
        console.error(err)
        next();
    }
}

const refreshToken = async (req, res) => {
    const { refresh_token: requestToken } = req.body;
    if (requestToken === null) res.status(403).json({ message: "Refresh Token is required!" })
    try {
        const refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
        console.log(refreshToken)
        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" })
            return;
        }
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } })
            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request"
            });
            return;
        }
        const newAccessToken = jwt.sign({ id: refreshToken.id }, process.env.JWT_KEY, {
            expiresIn: config.jwtRefreshExpiration
        })
        const newRefreshToken = await RefreshToken.createToken(user);
        return res.status(200).json({
            access_token: newAccessToken,
            refresh_token: refreshToken.token
            // refresh_token: newRefreshToken
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    signUp,
    login,
    refreshToken
}