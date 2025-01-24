import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        stocks: [], 
    });

    try {
        await user.save();
        return res.status(201).json({ message: "User successfully created", user });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Failed to create user" });
    }
};

export const login = async(req,res)=>{

    const {email,password} = req.body
    let existingUser

    try{
        existingUser = await User.findOne({email})
    }
    catch(e){
        return console.log(e);
    }

    if(!existingUser){
        return res.status(400).json({message:"User does not exist"})
    }
    
    const ispassword = bcrypt.compareSync(password,existingUser.password)
    if(!ispassword){
        return res.status(400).json({message:"Invalid Password"})
    }

    const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"35s"
    })

    // console.log("Generated token\n",token);

    if(req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`] = ""
    }
    
    res.cookie(String(existingUser._id),token,{
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now() + 1000*30),
        sameSite:'lax',
    })

    return res.status(201).json({message:"Login Successfully....",existingUser,token})
    
 }
 export const VerifyToken = async(req,res,next)=>{

    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    // console.log(token);
    
    if(!token){
        res.status(400).json({message:"No token found"})
    }
    
    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
             return res.status(400).json({message:"Invalid token"})
        }
        // console.log(user.id);
        req.id = user.id;
            
    })    
    next();
 }

 export const getUser = async(req,res)=>{
    const userid = req.params.id;
    let user;
    try{
        user = await User.findById(userid,"-password")
    }
    catch(e){
        return console.log(e);
    }
    if(!user){
        return res.status(400).json({message:"User does not exist"})
    }
    return res.status(200).json({user})
    
 }

 export const refreshToken = (req,res,next)=>{
    const cookies = req.headers.cookie
    if (!cookies) {
        return res.status(400).json({ message: "No cookies found" });
    }
    const prevToken = cookies.split("=")[1]
    if(!prevToken){
        return res.status(400).json({message:"No token found"})
    }
    jwt.verify(String(prevToken),process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(400).json({message:"Invalid token"})
        }
        
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = ""

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{
            expiresIn:'35s'
        })

        // console.log("Regenerated Token\n",token);
        
        res.cookie(String(user.id),token,{
            path:"/",
            expires:new Date(Date.now()+1000*30),
            httpOnly:true,
            sameSite:"lax",

        })
        req.id  = user.id
        next()
    })
 }

 export const logout = async(req,res,next)=>{
    const cookies = req.headers.cookie
    
    const prevToken = cookies.split("=")[1]
    if(!prevToken){
        return res.status(400).json({message:"No token found"})
    }

    jwt.verify(String(prevToken),process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            console.log(err);
            
            return res.status(403).json({message:"Invalid token"})
        }
        
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = ""

        return res.status(200).json({message:"Successfully Logged Out..."})
    })

 }

