const { Op } = require('sequelize');
const User = require('../models/user.model');
const jwt = require('../utils/jwt.util');

const auth = async (req, res, next) => {
    const { email } = req.body;
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Accès interdit."
        });
    }

    const token = authorization.split(" ")[1];
    const user = await User.findOne({ where: { [Op.and]: { email: email, accessToken: token, accessTokenExpires: { [Op.gt]: Date.now() } } } });

    if (!user) {
        return res.status(401).json({
            message: "Accès interdit."
        });
    }

    const userData = await jwt.verify(user.accessToken);

    if (!userData) {
        return res.status(401).json({
            message: "Accès interdit."
        });
    }

    req.decoded = userData.data;

    next();
}

module.exports = auth;