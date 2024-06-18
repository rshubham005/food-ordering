import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
  restaurant_name: String,
  city: String,
  address: String,
  number: String,
  email: String,
  password: String,
});

export const restaurantSchema =
  mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);
