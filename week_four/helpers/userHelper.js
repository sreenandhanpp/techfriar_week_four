const User = require('../MongoDb/models/userModels/User.js');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwtConfig.js');
module.exports = {
    //Creating user 
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            // bcrypting the password with bcrypt library which convert the password into a hex value
            userData.password = await bcrypt.hash(userData.password, 10);
            const user = new User({
                username: userData.username,
                fullname: userData.fullname,
                email: userData.email,
                address: userData.address,
                password: userData.password,
                isAdmin: false,
                phone: userData.phone
            });
            user.save(user).then((data) => {
                const userData = {
                    username: data.username,
                    email: data.email,
                    isAdmin: false,
                    token: generateToken(data)
                };
                resolve(userData);
            }).catch(err => {
                reject(err);
            });
        });
    },
    //Validating User
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            //if the user email matches
            const user = await User.findOne({ email: userData.email });
            //if the email found compare the password with bcrypt library
            if (user) {
               let status = await bcrypt.compare(userData.password, user.password)
                    if (status) {
                        const data = {
                            username: user.username,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            token: generateToken(user)
                        }
                        resolve(data);
                    } else {
                        // res.status(401).json({ message: 'Invalid username or password' });  
                        reject();
                    }
            } else {
                // res.status(401).json({ message: 'Invalid username or password' });
                reject();
            }
        });
    }
};