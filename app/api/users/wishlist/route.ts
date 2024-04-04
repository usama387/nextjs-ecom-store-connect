import { connectToDB } from "@/lib/connectToDb";
import User from "@/lib/models/User";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    // checking if user logged in
    const { userId } = auth();

    // if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized Request", { status: 401 });
    }

    await connectToDB();
    
    // finding user based on clerkId stored in sb and user id from input
    let user = await User.findOne({ clerkId: userId });

    // response if user not found
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // now if i have a user i need productId to add it in wishlist
    const { productId } = await request.json();

    // if productId not received
    if (!productId) {
      return new NextResponse("ProductId required", { status: 400 });
    }

    // adding product to wishlist if productId is received
    const isLiked = user.wishlist.includes(productId);

    // In if condition if IsLiked is true then remove the item from wishlist otherwise add it in else condition
    if (isLiked) {
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    // saving the user
    await user.save();

    // returning saved user
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[wishlist_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
