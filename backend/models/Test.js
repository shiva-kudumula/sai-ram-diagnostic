import mongoose from 'mongoose';
const testSchema=new mongoose.Schema({name:{type:String,required:true,trim:true,unique:true},price:{type:Number,required:true,min:0},category:{type:String,required:true,trim:true},description:{type:String,default:'Diagnostic test available at Sai Ram Diagnostic Center.'},isAvailable:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('Test',testSchema);
