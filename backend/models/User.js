import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,trim:true,lowercase:true,unique:true},phone:{type:String,required:true,trim:true},password:{type:String,required:true,minlength:8,select:false},role:{type:String,enum:['patient','admin'],default:'patient'}},{timestamps:true});
export default mongoose.model('User',userSchema);
