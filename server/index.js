require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/item",itemRoutes);

app.get("/",(req,res)=>{
   res.send("API Running");
});

app.listen(5000,()=>{
   console.log("Server Started");
});