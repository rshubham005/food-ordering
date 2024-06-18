import { UserSchema } from "@/app/config/UserScheme";
import { dbConnect } from "@/app/config/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  let payload = await req.json();
  await mongoose.connect(dbConnect);
  let result = await UserSchema.findOne({
    email: payload.email,
    password: payload.password,
  });
  if (result) {
    return NextResponse.json({ result, success: true });
  } else {
    return NextResponse.json({ result: [], success: false });
  }
}
