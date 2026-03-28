const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/signup", async(req,res)=>{
 try{

   const {name,email,password,mobile} = req.body;

   const hash = await bcrypt.hash(password,10);

   const user = await User.create({
     name,email,password:hash,mobile
   });

   res.json(user);

 }catch(err){
   res.status(500).json(err);
 }
});

router.post("/login", async(req,res)=>{
 try{

   const {email,password} = req.body;

   const user = await User.findOne({email});

   if(!user) return res.json("User not found");

   const match = await bcrypt.compare(password,user.password);

   if(!match) return res.json("Wrong password");

   const token = jwt.sign(
     {id:user._id,role:user.role},
     process.env.JWT_SECRET
   );

   res.json({user,token});

 }catch(err){
   res.status(500).json(err);
 }
});

module.exports = router;