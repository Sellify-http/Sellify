const expressAsyncHandler = require('express-async-handler');
const userCredentials = require('../Models/userModels');
const bcrypt = require('bcrypt');

const registerUser = expressAsyncHandler(async(req, res) => {
    const {userName, email, password} = req.body;

    const existingUser = await userCredentials.findOne({email});
    
    if(existingUser){
        res.status(400).send({message: 'User already exists.'})
        
    }

    try {
        const saveNewUser = await userCredentials.create(
            {userName,
            email,
            password: await bcrypt.hash(password, 10)
        }
        );

        if(saveNewUser){
            res.status(200).json({
                _id:saveNewUser._id,
                userName:saveNewUser.userName,
                email:saveNewUser.email,
            });
        } else{
            res.status(400)
            throw new Error('User not found');
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
});

module.exports = {registerUser};