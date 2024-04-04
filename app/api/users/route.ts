import { connectToDB } from "@/lib/connectToDb";
import User from "@/lib/models/User";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    // checking if user exists
    const { userId } = auth();

    // response if there is no user
    if (!userId) {
      return new NextResponse("Unauthorized Request", { status: 401 });
    }

    await connectToDB();

    // finding user based on clerkId stored in sb and user id from input
    let user = await User.findOne({ clerkId: userId });

    // if user does not exist then i create it when logs in for the first time
    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[users_POST]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
