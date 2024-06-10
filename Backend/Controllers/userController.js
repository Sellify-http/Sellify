const expressAsyncHandler = require('express-async-handler');
const userCredentials = require('../Models/userModels');
const bcrypt = require('bcrypt');
const generateToken = require('../config/generateToken');

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

const authUser = async(req, res) => {
    const {email, password} = req.body;
    const user = await userCredentials.findOne({email});

    if(user && await bcrypt.compare(password, user.password)){
        const token = generateToken(user._id);
        res.status(200).send({message: 'Authnetication sucessfull', token: token});
    }else{
        res.status(400).send({message:"Email or password incorrect. Try again!!"})
    }
}



module.exports = {registerUser, authUser};