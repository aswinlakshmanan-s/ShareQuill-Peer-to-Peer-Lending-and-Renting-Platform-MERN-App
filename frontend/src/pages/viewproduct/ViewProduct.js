import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Example from "./Example";
import Appheader from "../../components/header/header";
import Mainfooter from "../main/footer";

const ViewProduct = () => {
  const location = useLocation();
  const product = location.state.product;

  const makePayment = async (product, price) => {
    product["price"] = price;
    console.log("PRICE | ", price);
    const stripe = await loadStripe(
      "pk_test_51OHtYWHfFaxHofKUsnnno0r5QE3LVagHBag6E53tayznGP6vJtVkQPdSL805NPEHiWXgt7Es4r0NhGhOxRyS0cm500ono6kauf"
    );
    const body = { product };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:5000/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
    <Appheader/>
    <Example product={product} makePayment={makePayment} />;
    <Mainfooter/>
    </>
  );
};

export default ViewProduct;
