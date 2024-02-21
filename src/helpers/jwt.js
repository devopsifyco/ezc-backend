const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;

const generateAccessToken = (user) => {
    return token = jwt.sign({
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3h"
    });

}
const generateRefreshToken = (user) => {
    return refreshtoken = jwt.sign({
        email: user.email
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d"
    });
}

const verifyAccessToken = (access_token) => {
    token = access_token
    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            const decoded = jwt.decode(token);
            return {
                exp: decoded.exp,
                email: decoded.email
            }
        }
    }
}

const verifyRefreshToken = (refresh_token) => {
    try {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const decoded = jwt.verify(refresh_token, secret);
        return decoded;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return {
                expired: true
            }
        }
        console.log(err);
    }
}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken
}