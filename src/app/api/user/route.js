import { UserSchema } from "@/app/config/UserScheme";
import { dbConnect } from "@/app/config/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  let payload = await req.json();
  console.log(payload);
  await mongoose.connect(dbConnect);
  let data = new UserSchema(payload);
  let result = await data.save();
  if (result) return NextResponse.json({ result, success: true });
  else return NextResponse.json({ result: [], success: true });
}
