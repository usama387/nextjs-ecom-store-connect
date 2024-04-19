"use client";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  CircleUserRound,
  CircleUserRoundIcon,
  Menu,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  // accessing logged in user to show menu and this method works only for client side
  const { user } = useUser();

  // managing state for dropdown
  const [dropDownMenu, setDropDownMenu] = useState(false);

  const cart = useCart();

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white">
      <Link href={"/"}>
        <Image
          src="/online-supermarket.png"
          alt="logo"
          width={100}
          height={80}
          className="rounded-md"
        />
      </Link>

      {/* Contains Home route and dark mode switch */}
      <div className="flex items-center gap-2">
        <Link href={"/"} className="bg-teal-600 text-white p-2 rounded-md">Home</Link>
        {/* Dark Mode Switch */}
      </div>

      {/* Cart Count and Icon */}
      <div className="flex gap-3 items-center relative">
        <Link
          href={"/cart"}
          className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-black hover:text-white"
        >
          <ShoppingBag />

          {/* accessing current state of cart with cartItems hook of useCart */}
          <p className="text-base-medium">Cart ({cart.cartItems.length})</p>
        </Link>

        {/* Wishlist and orders */}
        {user && (
          <Menu
            className="cursor-pointer"
            onClick={() => setDropDownMenu(!dropDownMenu)}
          />
        )}

        {/* rendering dropdown menu  */}
        {user && dropDownMenu && (
          <div className="absolute top-10 right-5 flex flex-col gap-2 p-3 rounded-lg border text-base-medium bg-[#000000] text-white">
            <Link href={"/wishlist"} className="hover:text-blue-800">
              Wishlist
            </Link>
            <Link href={"/orders"} className="hover:text-blue-800">
              Orders
            </Link>
          </div>
        )}

        {/* rendering when user is signed in or logged out */}
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href={"/sign-in"}>
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
