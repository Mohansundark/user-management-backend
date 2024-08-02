import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
    password: string;
    bio: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String},
});

userSchema.pre('save', async function (next) {

  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
    }
    
  // hash the password
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
