const config = require('../config/authconfig.json');
const { v4: uuidv4 } = require('uuid');
const { sequelize, Sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken", {
        token: {
            type: Sequelize.STRING()
        },
        expiryDate: {
            type: Sequelize.DATE()
        }
    });
    RefreshToken.createToken = async function (user) {
        let expireAt = new Date();
        expireAt.setSeconds(expireAt.getSeconds() + config.jwtRefreshExpiration);

        const _token = uuidv4();

        const refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expiryDate: expireAt.getTime()
        });

        return refreshToken.token;
    };

    RefreshToken.verifyExpiration = token => {
        return token.expiryDate.getTime() < new Date().getTime()
    }

    return RefreshToken
}