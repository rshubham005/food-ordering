import { dbConnect } from "@/app/config/db";
import { foodSchema } from "@/app/config/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let payload = await req.json();
  let data = new foodSchema(payload);
  let result = await data.save();
  console.log("Hellp", result);
  if (result) return NextResponse.json({ result, success: true });
  else return NextResponse.json({ result, success: false });
}
