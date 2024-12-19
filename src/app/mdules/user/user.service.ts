import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

// create a user
const createUserIntoDB = async (userData: IUser) => {
  // check user exist by this email
  const isExistingUser = await User.findOne({ email: userData.email });
  if (isExistingUser?.isDeleted) {
    await User.findByIdAndUpdate(
      isExistingUser?._id,
      { isDeleted: false },
      { new: true }
    );
  }

  if (isExistingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user already exist");
  }

  // Fetch the highest existing ID in the database
  const lastUser = await User.findOne({}, { id: 1 }) // Fetch only the 'id' field
    .sort({ createdAt: -1, id: -1 }) // Sort in descending order to get the highest ID
    .lean(); // Optimize query by returning plain JavaScript object

  // Generate the next ID
  const nextId = lastUser ? (parseInt(lastUser.id) + 1).toString() : "1";

  // Set the generated ID to the new user
  userData.id = nextId;

  // Create the user in the database
  const user = new User(userData);
  const newUser = await user.save();

  return newUser;
};

// get all user from db
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

// get single user by id
const getSingleUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

// get single user by email
const getSingleUserByEmailFromDB = async (email: string) => {
  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }
  const user = await User.findOne({ email });
  return user;
};

// update single user by id
const updateSingleUserByIdFromDB = async (id: string, updateUser: IUser) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateUser, {
    new: true,
  });
  return updatedUser;
};

// delete single user by id
const deleteSingleUserByIdFromDB = async (id: string) => {
  await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return {};
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserByIdFromDB,
  getSingleUserByEmailFromDB,
  updateSingleUserByIdFromDB,
  deleteSingleUserByIdFromDB,
};
