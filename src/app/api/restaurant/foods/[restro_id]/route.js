import { dbConnect } from "@/app/config/db";
import { foodSchema } from "@/app/config/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  let id = content.params.restro_id;
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let data = await foodSchema.find({ restro_id: id });
  if (data) {
    return NextResponse.json({ result: data, success: true });
  } else {
    return NextResponse.json({ result: [], success: false });
  }
}

export async function DELETE(req, content) {
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let id = content.params.restro_id;
  let result = await foodSchema.deleteOne({ _id: id });
  if (result) {
    return NextResponse.json({ result: result, success: true });
  } else {
    return NextResponse.json({ result: [], success: false });
  }
}
