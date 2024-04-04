import { getCollections } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  // first function in fetcher.ts to fetch collections
  const Collections = await getCollections();

  //   the collections are being mapped to display Image, title and products

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold text-[#acabb4]">Collections</p>
      <div className="flex items-center justify-center gap-8">
        {Collections.map((collection: CollectionType) => (
          <Link href={`/collections${collection._id}`} key={collection._id}>
            <Image
              src={collection.image}
              alt={collection.title}
              width={300}
              height={160}
              className="rounded-lg cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
