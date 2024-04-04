import { getProducts } from "@/lib/actions";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  // function that fetches api from dashboard to get all products
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {products.map((product: ProductType) => (

            // after mapping products sending all product details and id to this component
            
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
};

export default ProductList;
