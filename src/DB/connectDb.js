const mongoose=require("mongoose")
require("dotenv").config()
const connectDb=()=>{
    const con=mongoose.connect(process.env.MONGODB_URI)
    if(!con)throw new Error("error connecting to Db")
        console.log('Db connection successfull');
}
module.exports=connectDb