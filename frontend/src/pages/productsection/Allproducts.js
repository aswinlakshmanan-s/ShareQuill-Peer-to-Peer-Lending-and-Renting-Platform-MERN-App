import React, { useEffect, useState } from "react";
import Productsection from "./Productsection";
import Appheader from "../../components/header/header";
import Mainfooter from "../main/footer";

export default function Allproducts() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/products/home/fetch"
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
  }
  