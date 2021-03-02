const jwt = require("jsonwebtoken");

//const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");



const authenticate = (token) => {
    if (token) {
        const value = token.split(`Bearer `).pop()
        const decoded = jwt.verify(value, process.env.JWT_SECRET);
        if (!decoded) return null
        return {
            ...decoded
        }
    }

    if (!token || !decoded) return null

}

const genToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' })
    return token
}


// const is = (payload) => {
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' })
//     return token
// }

module.exports = { genToken, authenticate }