"use client";

import Image from "next/image";
import Link from "next/link";

import Heart from "./Heart";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover "
      />
      <div>
        <p className="text-[#3d0000] font-bold">{product.title}</p>
        <p className="italic text-teal-900 ">{product.category}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-semibold">{product.price}PKR</p>
        <Heart product={product} />
      </div>
    </Link>
  );
};

export default ProductCard;
