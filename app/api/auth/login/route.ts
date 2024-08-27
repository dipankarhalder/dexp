import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/config/dbConfig";
import Users from "@/models/usersModel";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();

    const user = await Users.findOne({ email: reqBody.email });
    if(!findUser) {
      return NextResponse.json({
        message: "The user does not exist.",
        success: true,
      }, { status: 400 });
    }

    const isCorrectPassword = await bcrypt.compare(reqBody.password, user.password);
    if(!isCorrectPassword) {
      return NextResponse.json({
        message: "Invalid Credentials",
        success: true,
      }, { status: 400 });
    }

    const dataToEncrypt = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }

    const token = jwt.sign(dataToEncrypt, process.env.jwt_secret!, {
      expiresIn: "id",
    });

    return NextResponse.json({
      data: token,
      success: true,
    }, { status: 201 });

  } catch(error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}