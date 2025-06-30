import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    avatar:{
      type:String,
      default: "https://example.com/default-avatar.png"
    },
    password: {
      type: String,
      required: true
    },
    isActive: { type: Boolean, default: true }, 
  plantations: {
      type: Number,
      default: 0  
    },
   
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    goal: { type: Number, default: 50 },
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password =  bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);