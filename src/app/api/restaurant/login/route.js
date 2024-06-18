import { dbConnect } from "@/app/config/db";
import { restaurantSchema } from "@/app/config/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  let payload = await req.json();
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  console.log(payload);
  let result = await restaurantSchema.findOne({
    email: payload.email,
    password: payload.password,
  });
  console.log(result);
  if (result != null) {
    return NextResponse.json({ result: result, success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
