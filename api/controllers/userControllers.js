const User = require("../models/users");

const RegisterUser = async (req,res) => {
    try{
        const {username,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(403).json("Existing user, Please login!")
        }
        const hpassword = await bcrypt.hash(password,10);
        const userData = {username,email,password:hpassword,tasks:[]};
        const newUser = await User.insertOne(userData);
        res.status(200).json(newUser);
    }catch(error){
        res.status(500).json({message : "Internal server error!"})
    }
}

const LoginUser = async (req,res) => {
    try{
        const {email,password} = req.body;
        const UserDetails = await User.findOne({email});
        if(!UserDetails){
            return res.status(404).json({error:"User not found! Please Create an account and try again..."})
        }
        const passwordMatch = await bcrypt.compare(password,UserDetails.password);
        if(!passwordMatch){
            return res.status(401).json("Password was incorrect!")
        }else{
            return res.status(200).json(UserDetails);
        }
    }catch(error){
        res.status(500).json({message : "Internal server error!"})
    }
}

const GetUserByUsername = async (req,res) => {
    try {
        const username = req.params.username;
        console.log("Username :",username)
        const user = await User.findOne({username});
        if(!user){
            return res.status(501).json("Error in adding task");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json("Internal server error!")
    }
}

module.exports = {RegisterUser,LoginUser,GetUserByUsername}
