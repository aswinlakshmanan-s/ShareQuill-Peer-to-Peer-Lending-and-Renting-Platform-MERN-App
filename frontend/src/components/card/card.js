import React, { useEffect, useState } from "react";
import ProductDisplay from "../partials/ProductDisplay";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/home/fetch"
        );
        const data = await response.json();
        setProducts(data);
        setSortedProducts([...data]); // Create a copy for sorting
      } catch (e) {
        console.error(e);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Recently Posted
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductDisplay product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
