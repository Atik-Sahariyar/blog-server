
import { User } from "./user.model";



// admin can block single user by id
const blockUserByIdFromDB = async (id: string) => {
  const blockUser = await User.findByIdAndUpdate(id, { isBlocked: true}, {
    new: true,
  });
  return blockUser;
};


export const UserServices = {
  blockUserByIdFromDB,
};
