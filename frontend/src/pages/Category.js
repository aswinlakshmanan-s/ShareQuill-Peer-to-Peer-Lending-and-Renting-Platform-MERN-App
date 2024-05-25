import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Productsection from "./productsection/Productsection";
import Appheader from "../components/header/header";
import Mainfooter from "./main/footer";

const Category = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  console.log("Category..", category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/category/${category}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Appheader/>
        <Productsection products={products}/>
        <Mainfooter/>
    </>
  );
};

export default Category;
