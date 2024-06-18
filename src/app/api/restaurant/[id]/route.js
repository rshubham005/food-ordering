import { dbConnect } from "@/app/config/db";
import { foodSchema } from "@/app/config/foodModel";
import { restaurantSchema } from "@/app/config/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  let id = content.params.id;
  await mongoose.connect(dbConnect);
  let details = await restaurantSchema.findOne({ _id: id });
  let foods = await foodSchema.find({ restro_id: id });

  if (details && foods) {
    return NextResponse.json({ details, foods, success: true });
  } else {
    return NextResponse.json({ details:[], foods:[], success: false });
  }
}
