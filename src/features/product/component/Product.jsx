import { StarIcon } from "@heroicons/react/20/solid";
import React from "react";

const Product = ({data}) => {

    const { id, title, description, price, discountPercentage, rating, thumbnail } = data;
    
  return (
    <div className="group relative border p-2 rounded-md">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
        <img
          src={thumbnail}
          alt="product-image"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{title}</h3>
          <div className="flex items-center space-x-1">
            <p className="mt-1 text-sm text-gray-500">{rating}</p>
            <StarIcon className="h-4 w-4"/>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900">$ {Math.round(price * (1 - discountPercentage /100 ))}</p>
          <p className="text-sm font-medium text-gray-400 line-through ">$ {price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
