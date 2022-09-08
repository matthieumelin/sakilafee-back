const jwt = require('jsonwebtoken');
const apiConfig = require('../../config/config.json').development;

exports.createJwt = async (data) => {
    try {
        const hours = 12;
        const expirationDate = new Date(Date.now()).getTime() + (((1000 * 60) * 60) * hours);

        data.expirationDate = expirationDate;

        const token = await jwt.sign({
            data
        }, apiConfig.secretKey, { expiresIn: `${hours}h` });

        if (token) {
            return { token: token, expirationDate: expirationDate };
        }
    } catch (error) {
        console.error('Unable to sign new JWToken');
    }
    return false;
}

exports.verify = async (token) => {
    try {
        const decodedData = await jwt.verify(token, apiConfig.privateKey);
        return decodedData;
    } catch (error) {
        console.error("Unable to verify JWToken.");
    }
    return false;
}