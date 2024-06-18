import mongoose from "mongoose";

const UserModel = mongoose.Schema({
  name: String,
  city: String,
  address: String,
  number: String,
  email: String,
  password: String,
  confirm_password: String,
});

export const UserSchema =
  mongoose.models.user || mongoose.model("user", UserModel);
