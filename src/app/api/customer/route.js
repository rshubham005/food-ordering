import { dbConnect } from "@/app/config/db";
import { restaurantSchema } from "@/app/config/restaurantModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  await mongoose.connect(dbConnect, { useNewUrlParser: true });
  let params = req.nextUrl.searchParams;
  let fiterVar = {};
  console.log(params.get("location"));
  if (params.get("location")) {
    let city = params.get("location");
    fiterVar.city = city.charAt(0).toUpperCase() + city.slice(1);
  }
  if (params.get("restaurant")) {
    let restaurant_name = params.get("restaurant");
    fiterVar.restaurant_name =restaurant_name
    //   restaurant_name.charAt(0).toUpperCase() + restaurant_name.slice(1);
  }

  let result = await restaurantSchema.find(fiterVar);
  if (result) {
    return NextResponse.json({ result, success: true });
  } else {
    return NextResponse.json({ result: [], success: false });
  }
}
