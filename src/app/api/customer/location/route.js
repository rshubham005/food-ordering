import { dbConnect } from "@/app/config/db";
import { restaurantSchema } from "@/app/config/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let result = await restaurantSchema.find()
  result = result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1))
   result = [... new Set(result.map((item)=>item))]
  return NextResponse.json({result,success:true})
}
