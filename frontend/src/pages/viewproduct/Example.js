import React, { useState } from "react";
import DatePicker from "../../components/datepicker/DatePicker";

const Example = ({ product, makePayment }) => {
  const defaultPrice = product.price;
  const [price, setPrice] = useState(defaultPrice);
  const [noOfDays, setNoOfDays] = useState(1);
  const [activeImg, setActiveImage] = useState(
    product.images.imageUrl[0]
  );
  const [dateSelected, setDateSelected] = useState(1);

  const streetAddress = product.streetAddress;
  const city = product.city;
  const state = product.state;
  const zipCode = product.postalCode;
  const address = `${streetAddress}, ${zipCode}, ${city}, ${state}`;

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center ">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={activeImg}
          alt=""
          className="w-25 h-25 aspect-square object-cover rounded-xl"
        />
        <div className="flex flex-row justify-between h-24">
          {product.images.imageUrl.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className="w-24 h-24 rounded-md cursor-pointer"
              onClick={() => setActiveImage(image)}
            />
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className=" text-violet-600 font-semibold">{product.type}</span>
          <h1 className="text-3xl font-bold">{product.name}</h1>
        </div>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-gray-700">
          <span className=" text-violet-600 font-semibold">Address : </span>
          {address}
        </p>
        <h6 className="text-2xl font-semibold">
          $
          {price
            ? price.toFixed(2)
            : (() => {
                setPrice(defaultPrice);
                return defaultPrice.toFixed(2);
              })()}
        </h6>

        <p className="text-m">Select Days - {noOfDays ? noOfDays : 1} day/s selected</p>
        <DatePicker setNoOfDays={setNoOfDays} price={price} setPrice={setPrice} setDateSelected={setDateSelected} />
        <div className="flex flex-row items-center gap-12">
          <button
            onClick={() => makePayment(product, price)}
            className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
            disabled={!dateSelected}
          >
            Rent now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Example;
