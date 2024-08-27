import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/config/dbConfig";
import Users from "@/models/usersModel";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();

    const existingUser = await Users.findOne({ email: reqBody.email });
    if(existingUser) {
      return NextResponse.json({
        message: "The user is already associated with an account, please try once with new email address",
        success: true,
      }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashPassword;

    const newUser = new Users(reqBody);
    await newUser.save();
    return NextResponse.json({
      message: `${reqBody.firstName} ${reqBody.lastName} registered successfully, please login with same credential.`,
      success: true,
    }, { status: 201 });

  } catch(error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}