const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({
            code: 401,
            message: '토큰 없음'
        })
        const verify = jwt.verify(token, process.env.JWT_KEY);
        req.user = verify;
        next()
    } catch (err) {
        console.error(err)
        res.status(400).send('Invalid token !');
    }
}