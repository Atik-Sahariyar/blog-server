import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { IUser } from '../user/user.interface';


// register a new user
const registerUserIntoDB = async (userData: IUser) => {
  // check user exist by this email
  const isExistingUser = await User.findOne({ email: userData.email });

  if (isExistingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user already exist");
  }
  
  // Create the user in the database
  const user = new User(userData);
  const newUser = await user.save();

  return newUser;
};


// login user
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! ');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );


  return {
    accessToken,
  };
};



export const AuthServices = {
  loginUser,
  registerUserIntoDB
};
