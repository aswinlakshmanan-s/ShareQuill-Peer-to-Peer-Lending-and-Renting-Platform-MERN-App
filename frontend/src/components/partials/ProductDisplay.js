import React from "react";
import { useNavigate } from "react-router-dom";
import { Tilt } from "react-tilt";

const ProductDisplay = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/products/${product._id}`, { state: { product } });
      }}
    >
      
      <div key={product._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.images.imageUrl[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$ {(product.price).toFixed(2)}</p>
              </div>
            </div>
        
    </div>
  );
};

export default ProductDisplay;
