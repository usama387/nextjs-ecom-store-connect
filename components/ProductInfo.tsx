"use client";
import { useState } from "react";
import Heart from "./Heart";
import { MinusCircle, PlusCircle } from "lucide-react";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  //   managing state for color selection by default first item will be selected in the array
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );

  //   managing state for color selection by default first item will be selected in the array
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );

  //managing state for cart count by default first item will be one
  const [count, setCount] = useState<number>(1);

  return (
    <div className="max-w-[400px] flex flex-col gap-4 ">
      <div className="flex justify-between items-center">
        <p className="text-[#4b3333] font-bold">{productInfo.title}</p>
        <Heart product={productInfo} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-small-bold font-extrabold">Category:</p>
        <p className="text-teal-900 font-semibold italic">
          {productInfo.category}
        </p>
      </div>
      <p className="text-heading3-bold">PKR: {productInfo.price}</p>
      <div className="flex flex-col gap-2 text-start">
        <p className="font-extrabold">Description:</p>
        <p className="text-teal-900 text-small-bold">
          {productInfo.description}
        </p>
      </div>
      {/* colors are being mapped and with template literal and useState background changes on selection */}
      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium">Colors:</p>
          <div className="flex gap-2 ">
            {productInfo.colors.map((color, index) => (
              <p
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer text-small-bold ${
                  selectedColor === color ? "bg-black text-white" : ""
                }`}
                key={index}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* sizes are being mapped and with template literal and useState background
      changes on selection */}
      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium">Sizes:</p>
          <div className="flex gap-2 ">
            {productInfo.sizes.map((size, index) => (
              <p
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer text-small-bold ${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
                key={index}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart button and Count */}
      <div className="flex flex-col gap-2">
        <p className="text-base-medium">Quantity</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => count > 1 && setCount(count - 1)}
          />
          <p className="text-body-1 ">{count}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setCount(count + 1)}
          />
        </div>
      </div>
      <button className="font-semibold rounded-md px-2 py-1 bg-teal-900 text-white cursor-pointer max-w-[200px]">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
