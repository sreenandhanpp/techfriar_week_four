const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET,{
        expiresIn: '10d'
    })
}

module.exports = generateToken