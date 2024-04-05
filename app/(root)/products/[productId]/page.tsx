import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails } from "@/lib/actions";
import React from "react";

const ProductsPage = async ({ params }: { params: { productId: string } }) => {
  // params and product Id are passed into below function to fetch details in action.ts file and then map here
  const productDetails = await getProductDetails(params.productId);

  return (
    <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      {/* passing media as props */}
      <Gallery productMedia={productDetails.media}/>
      
      {/* passing all product information as props  */}
      <ProductInfo productInfo={productDetails}/>
    </div>
  );
};

export default ProductsPage;
