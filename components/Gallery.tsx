"use client";
import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  // managing state for images
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="Product"
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.map((image, index) => (
          <Image
            src={image}
            alt="product"
            key={index}
            height={200}
            width={200}
            onClick={() => setMainImage(image)}
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
              mainImage === image ? "border-2 border-black" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
