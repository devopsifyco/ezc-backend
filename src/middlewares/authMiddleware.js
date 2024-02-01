const UserModel = require("../models/User.model");
const { verifyAccessToken } = require("../helpers/jwt");

const checkAuthentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send("Authorization header not found");
        }

        const token = authHeader.split(" ")[1]; // Get the token part after 'Bearer'

        if (!token) {
            return res.status(401).send("Token not found");
        }

        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return res.status(401).send("Invalid token");
        }

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).send("Token has expired");
        }

        const user = await UserModel.findOne(decoded.userId);

        if (!user) {
            return res.status(401).send("User not found");
        }

        req.userData = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    checkAuthentication
};
