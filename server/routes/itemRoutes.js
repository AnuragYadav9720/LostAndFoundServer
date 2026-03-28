const router = require("express").Router();
const auth = require("../middleware/auth");
const Item = require("../models/Item");

router.post("/upload",auth, async(req,res)=>{
 try{

   const item = await Item.create({
      ...req.body,
      uploadedBy:req.user.id
   });

   res.json(item);

 }catch(err){
   res.status(500).json(err);
 }
});

router.get("/", async(req,res)=>{
 const items = await Item.find().populate("uploadedBy");
 res.json(items);
});

router.delete("/:id",auth, async(req,res)=>{

 if(req.user.role !== "admin"){
   return res.status(403).json("Only admin");
 }

 await Item.findByIdAndDelete(req.params.id);

 res.json("Deleted");
});

module.exports = router;