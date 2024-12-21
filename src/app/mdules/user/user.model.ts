import bcrypt from 'bcrypt';
import { model, Schema }from 'mongoose';
import { IUser, UserModel } from './user.interface';


const userSchema = new  Schema<IUser>(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true, select: 0 },
        profilePicture: {
           type: String,
           default: "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png"
        },
        role: { 
            type: String,
            default: "user",
            enum: [ 'admin' , 'user'] 
        },
        isBlocked: { type: Boolean, default: false}
    },
    {
        timestamps: true,
    }
);


// Pre-save hook to hash password
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
      return next(); // Skip if password is not modified
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });


  // check existing user by email
  userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
  };
  


  // check password matching
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
  

  // Post-save hook to reset password in the response
  userSchema.post<IUser>('save', function (doc, next) {
    doc.password = ''; // Clear password before sending the response
    next();
  });

export const User = model<IUser, UserModel>('User', userSchema);