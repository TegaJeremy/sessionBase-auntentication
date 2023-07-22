const bcrypt = require('bcryptjs')
const userModel = require('../model/userModel')

//sigh up a user

exports.signup= async(req,res)=>{
    try {
        const {username, email,password}= req.body;

        //check if the email has already been regisered
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.status(400).json({message:"Email already exist"})
        }

        //salt the password
        const saltedPassword = await bcrypt.genSalt(10);
        //hash the password
        const hashedPassword = await bcrypt.hash(password, saltedPassword)

        // create a new user

        const user = new userModel({
            username,
            email,
            password:hashedPassword,
            // records:[]
        })

        //save the user
        await user.save();
        res.status(201).json({
            message:"user created succesfully"
        });
        
    } catch (error) {
        console.log(error)
        
    }
}

exports.signIn = async (req, res)=>{
    try {
        const {email,  password} = req.body;

        //check if the exixts
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({message:'invalid credentials'})
        }

        //compare the password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({message:'invalid credentials'})
        }

        //set user session
        req.session.user = user;


        res.status(200).json({message:"user signed successfully", 
                                user})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
        
    }
}

//getting all users

exports.getAll= async (req,res)=>{
    try {
        const all = await userModel.find()
        res.status(200).json({message:"all userers are", data:all})
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.signout = async (req,res)=>{
    //destroy the session
    req.session.destroy();
    res.status(200).json({message:"user signed out successfully"})

}