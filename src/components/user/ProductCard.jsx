import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddToCart from "./addToCart";

const ProductCard = ({ product, onBuyNow }) => {


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 relative">
      {/* Product Image with Overlay */}
      <Link
        to={`/product/${product.productId}`}
        className="relative group block"
        aria-label={`View details of ${product.name}`}
      >
        <img
          src={product.img[0] || "/fallback-image.jpg"}
          alt={product.name}
          loading="lazy" 

          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm sm:text-base font-medium pointer-events-none"
          tabIndex="-1"
        >
          Shop Now
        </button>
      </Link>


      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-1 sm:mt-2">
          <span className="text-xs sm:text-sm font-semibold">
            ₦{product.price.toLocaleString()}
          </span>
          <div className="flex items-center">
            {
              product?.rating === 0? "":
           

            <>
            


              <FaStar className="text-yellow-400 text-xs sm:text-sm mr-1" />
            <span className="text-xs sm:text-sm">{product.rating}</span>
            </>

}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row ">
          <AddToCart product={product} quantity={1} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
