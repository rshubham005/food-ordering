import { dbConnect } from "@/app/config/db";
import { restaurantSchema } from "@/app/config/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  const data = await restaurantSchema.find();
  console.log(data);
  return NextResponse.json(data);
}
export async function POST(req) {
  let payload = await req.json();
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let data = new restaurantSchema(payload);
  let response = await data.save();
  return NextResponse.json({ result: response, success: true });
}
