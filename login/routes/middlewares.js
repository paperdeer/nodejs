const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    // try {
    //     // req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    //     const authHeader = req.headers["authorization"]
    //     const token = authHeader && authHeader.split(" ")[1];
    //     if (!token) return res.status(400).json({ message: "토큰 없음" });
    //     const decoded = jwt.verify(token, process.env.JWT_KEY)
    //     if (decoded) {
    //         (err, user) => {

    //             if (err) res.status(403).json({ message: "인증 실패" })
    //             req.user = user;
    //             next();
    //         }
    //     }
    //     return next();
    // } catch (err) {
    //     if (err.name === "TokenExpireError") return res.status(401).json({ code: 419, message: "토큰 만료됨" });
    //     return res.status(401).json({
    //         code: 401,
    //         message: "유효하지 않은 토큰"
    //     })
    // }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const verified = jwt.verify(token, process.env.JWT_KEY);
        req.user = verified;
        next();
    } catch (err) {
        console.log(err)
        res.status(400).send('Invalid token !');
    }
}