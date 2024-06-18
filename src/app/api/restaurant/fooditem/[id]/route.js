import { dbConnect } from "@/app/config/db";
import { foodSchema } from "@/app/config/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let id = content.params.id;
  let result = await foodSchema.findOne({ _id: id });
  if (result) {
    return NextResponse.json({ result, success: true });
  } else {
    return NextResponse.json({ result: [], success: false });
  }
}

export async function PUT(req, content) {
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let payload = await req.json();
  let id = content.params.id;
  console.log(payload);
  let result = await foodSchema.findOneAndUpdate({ _id: id }, payload);
  if (result) {
    return NextResponse.json({ result, success: true });
  } else {
    return NextResponse.json({ result: [], success: false });
  }
}
