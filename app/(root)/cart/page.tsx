"use client";
import useCart from "@/lib/hooks/useCart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartPage = () => {
  //  utilizing zustand hook here to use useCart functions here in this case i map over cartItems
  const cart = useCart();

  //  functions to calculate price
  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  const totalRounded = parseFloat(total.toFixed(2));

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col ">
      {/* This div contains product details and cart functions */}
      <div className="w-2/3">
        <p className="font-bold text-teal-700">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="font-semibold">Cart is empty</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem, index) => (
              <div
                className="flex max-sm:flex-col max-sm:gap-3 hover:bg-teal-500 px-6 py-5 justify-between items-center max-sm:items-start w-full rounded-lg"
                key={index}
              >
                {/* This div mapped and renders image, title, color and size */}
                <div className="flex items-center ">
                  <Image
                    src={cartItem.item.media[0]}
                    alt="product"
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold ">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}

                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">{cartItem.item.price} PKR</p>
                  </div>
                </div>

                {/* This div contains icons to increase and decrease quantity and trash icon to remove item */}
                <div className="flex gap-4 items-center ">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>
                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* This div contains price calculations and order functions */}
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-teal-500 rounded-lg px-4 py-5">
        {/* When the there is only one product it renders item otherwise items */}
        <p className="font-semibold pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>

        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>{totalRounded} PKR</span>
        </div>
        <button className="bg-blue-700 text-white rounded-md p-3 max-w-max">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
