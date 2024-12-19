import { Document, Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface IUser extends Document  {
    id: string;
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    needPasswordChange: boolean;
    role: 'Super Admin' | 'Admin' | 'user';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    passwordChangedAt?: Date;
};


export interface UserModel extends Model<IUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<IUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number,
    ): boolean;
  }


export type TUserRole = keyof typeof USER_ROLE;
