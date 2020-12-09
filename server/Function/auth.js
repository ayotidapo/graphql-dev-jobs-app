const jwt = require("jsonwebtoken");

const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");




const authenticate = (token) => {
    if (token) {
        const decoded = jwt.verify(token, jwtSecret);
        if (!decoded) return null
        return {
            ...decoded
        }
    }

    if (!token || !decoded) return null

}

module.exports = authenticate