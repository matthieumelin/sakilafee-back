const jwt = require('jsonwebtoken');
const apiConfig = require('../../config/config.json').development;

exports.createJwt = async (data) => {
    const hours = 12;
    const expirationDate = new Date(Date.now()).getTime() + (((1000 * 60) * 60) * hours);

    const token = await jwt.sign({
        data
    }, apiConfig.secretKey, { expiresIn: "12h" });

    if (token) {
        return { token: token, expirationDate: expirationDate };
    }
    return false;
}

exports.verify = async (token) => {
    const decodedData = await jwt.verify(token, apiConfig.privateKey);
    return decodedData;
}