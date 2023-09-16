const User = require('../MongoDb/models/userModels/User.js');


const isExist = (email) => {
    return new Promise(async(resolve,reject) => {
        const isEmail = await User.findOne({email:email});

        if(isEmail){
            resolve("Email is already exist")
        }
        // if(isUsername){
        //     resolve("Username is already exist")
        // }
        resolve(false);
    })
};

module.exports = isExist