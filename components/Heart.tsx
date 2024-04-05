"use client";

import { useUser } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Heart = ({ product }: { product: ProductType }) => {
  // managing state state for api false at the beggining the user might not be signed in first
  const [loading, setLoading] = useState(false);

  // managing state for user
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  // managing state for likes at the beggining it will be false means not liked
  const [isLiked, setIsLiked] = useState(false);

  // checking user
  const { user } = useUser();

  // if user is not signed in router pushes it back to sign-in
  const router = useRouter();

  // accessing user now
  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users", {
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();
      // passing data into setSignedInUser updating user state
      setSignedInUser(data);
      // now updating product state liked or not
      setIsLiked(data.wishlist.includes(product._id));
      // the api stops here
      setLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // onClick async function to handle like & dislike by fetching wishlist api since button is inside link therefore i need this parameter
  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      // if user not signed in push it to sign in page
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);

        const response = await fetch("/api/users/wishlist", {
          method: "POST",
          cache: "no-cache",
          body: JSON.stringify({ productId: product._id }),
        });

        const updatedUser = await response.json();
        // updating signedIn user
        setSignedInUser(updatedUser);
        // updating isLiked status
        setIsLiked(updatedUser.wishlist.includes(product._id));
      }
    } catch (error) {
      console.log("[wishlist_POST]", error);
    }
  };
  return (
    <div>
      <button onClick={handleLike}>
        <HeartIcon fill={`${isLiked ? "red" : "white"}`} />
      </button>
    </div>
  );
};

export default Heart;
