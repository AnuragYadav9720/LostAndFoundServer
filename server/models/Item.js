const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
   title:String,
   description:String,
   image:String,
   location:String,
   status:{type:String,default:"lost"},
   uploadedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   }
},{timestamps:true});

module.exports = mongoose.model("Item",itemSchema);