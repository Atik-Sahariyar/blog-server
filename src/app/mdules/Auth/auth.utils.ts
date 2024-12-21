import jwt from 'jsonwebtoken';
import { TUserRole } from '../user/user.interface';

export const createToken = (
  jwtPayload: { email: string; role: TUserRole },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
