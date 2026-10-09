const mongoose = require('mongoose')
const schema = new mongoose.Schema({
 senhaVersao:{type:Number,default:0},
 tokenHash:{type:String,required:true,unique:true},
 usuarioId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 expiresAt:{type:Date,required:true,index:{expires:0}},
},{timestamps:true})
module.exports=mongoose.model('Session',schema)
