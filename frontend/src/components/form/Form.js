import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../hooks/authRedirectHook";
import { Country, State, City } from "country-state-city";

export default function Form() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [price, setPrice] = useState("");
  const [showDiv, setShowDiv] = useState(true);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("Boston");

  const auth = useAuth();
  const states = State.getStatesOfCountry("US");

  const dropDownPicker = {
    Electronics: {
      Laptops: ["Laptop", "Laptop bag"],
      "Grooming and appliances": [
        "Hair clipper",
        "Hair Straightner",
        "Hairdryer",
        "Other hair care",
      ],
      "Computers and accessories": [
        "Keyboard",
        "Computers",
        "Gaming monitors",
        "Mouse",
        "Storage devices",
      ],
    },
    Gaming: {
      Consoles: [
        "Nintendo switch",
        "PlayStation 4",
        "PlayStation 5",
        "Xbox One",
        "Xbox 360",
      ],
      Games: [
        "PC games",
        "Xbox games",
        "Playstation5 games",
        "Playstation4 games",
      ],
    },
    "Virtual Reality": {"VR Accessories": ["Oculus Rift", "Other VR glasses", "PlayStation VR"]},
    Transport: {
      Bicycles: [
        "City bike",
        "E bike",
        "Mountain bike",
        "Other bicycles",
        "Racing bike",
      ],
      Car: ["Hatchback", "Sedan", "SUV"],
      "Car accessories": [
        "car lights",
        "Puncture repair kit",
        "Sun shades",
        "Tyre Inflator",
      ],
    },
  };

  const [fieldValidations, setFieldValidations] = useState({
    category: true,
    subcategory: true,
    type: true,
    name: true,
    about: true,
    streetAddress: true,
    postalCode: true,
    price: true,
  });

  const updateFieldValidation = (fieldName, isValid) => {
    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      [fieldName]: isValid,
    }));
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const categoryOptions = Object.keys(dropDownPicker);
  const subcategoryOptions = selectedCategory
    ? Object.keys(dropDownPicker[selectedCategory])
    : [];
  const typeOptions =
    selectedCategory && selectedSubcategory
      ? dropDownPicker[selectedCategory][selectedSubcategory] || []
      : [];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(
      files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name || "Unnamed File", // Set a default value if 'name' is undefined
      }))
    );
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleImageUpload = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      console.log(selectedFiles);

      // Append each selected image to the FormData object
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i].file);
      }

      // Send formData to the backend (you can use fetch or axios)
      fetch("http://localhost:5000/api/products/images/post", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setImageURLs(data);
          console.log("Images uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading images:", error);
        });
    }
  };

  const handleSubmit = (postData) => {
    // Send formData to the backend (you can use fetch or axios)

    fetch("http://localhost:5000/api/products/specs/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.accessToken,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleSave = () => {
    // Gather form values
    const formData = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      type: selectedType,
      name: document.getElementById("username").value,
      description: document.getElementById("about").value,
      images: imageURLs,
      streetAddress: document.getElementById("street-address").value,
      postalCode: document.getElementById("postal-code").value,
      state: selectedState,
      city: selectedCity,
      price: price,
    };

    const validations = {
      category: formData.category !== "",
      subcategory: formData.subcategory !== "",
      type: formData.type !== "",
      name: formData.name !== "",
      about: formData.description !== "",
      streetAddress: formData.streetAddress !== "",
      postalCode: formData.postalCode !== "",
      price: formData.price !== "",
    };

    // Update field validations
    setFieldValidations(validations);

    // Check if all validations pass
    if (Object.values(validations).every(Boolean)) {
      handleSubmit(formData);
      // Log the form values in JSON format
      console.log("Form Values:", JSON.stringify(formData, null, 2));
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <form className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Post your product
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Category */}
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory("");
                    setSelectedType("");
                    updateFieldValidation("category", e.target.value !== "");
                  }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    !fieldValidations.category ? "border-red-500" : "" // Apply red border if validation fails
                  }`}
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {!fieldValidations.category && (
                  <p className="text-sm text-red-500">Category is required.</p>
                )}
              </div>
            </div>

            {/* Sub-Category */}
            <div className="sm:col-span-3">
              <label
                htmlFor="subcategory"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sub-Category
              </label>
              <div className="mt-2">
                <select
                  id="subcategory"
                  name="subcategory"
                  value={selectedSubcategory}
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    setSelectedType("");
                    // Update the validation status
                    updateFieldValidation("subcategory", e.target.value !== "");
                  }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    !fieldValidations.subcategory ? "border-red-500" : "" // Apply red border if validation fails
                  }`}
                  required
                >
                  <option value="">Select Sub-Category</option>
                  {subcategoryOptions.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
                {!fieldValidations.subcategory && (
                  <p className="text-sm text-red-500">
                    Subcategory is required.
                  </p>
                )}
              </div>
            </div>

            {/* Type */}
            <div className="sm:col-span-3">
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Type
              </label>
              <div className="mt-2">
                <select
                  id="type"
                  name="type"
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    // Update the validation status
                    updateFieldValidation("type", e.target.value !== "");
                  }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    !fieldValidations.type ? "border-red-500" : "" // Apply red border if validation fails
                  }`}
                  required
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {!fieldValidations.type && (
                  <p className="text-sm text-red-500">Type is required.</p>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>

              <div className="mt-2">
                <div
                  className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${
                    !fieldValidations.name ? "border-red-500" : "" // Apply red border if validation fails
                  }`}
                >
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                      !fieldValidations.name ? "border-red-500" : "" // Apply red border if validation fails
                    }`}
                    placeholder="Name of the product"
                    required
                    onChange={(e) => {
                      setFieldValidations((prev) => ({
                        ...prev,
                        name: e.target.value.trim() !== "",
                      }));
                    }}
                  />
                </div>
                {!fieldValidations.name && (
                  <p className="text-sm text-red-500">Name is required.</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about the product.
              </p>
            </div>

            {/* Product photo */}
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {selectedFiles.length > 0 ? (
                    <div className="mt-4 flex flex-col space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src={file.preview}
                            alt={file.file.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span>{file.file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 px-2 py-1 border border-red-500 rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                      >
                        Upload Image
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          accept="image/*"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          multiple
                        />
                      </label>
                    </div>
                  )}
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Country */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Street address */}
            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Street Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            {/* State or province */}
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State or province
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  onChange={handleStateChange}
                  value={selectedState}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                >
                  {states.map((state) => (
                    <option value={state.isoCode} key={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City */}
            {selectedState && (
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    onChange={handleCityChange}
                    value={selectedCity}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    required
                  >
                    {City.getCitiesOfState("US", selectedState).map((city) => (
                      <option value={city.name} key={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Price */}
            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  placeholder="Enter the price"
                  required
                />
              </div>
            </div>

            {/* ZIP / Postal code */}
            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
        <button
          type="reset"
          className="rounded-md bg-black-1000 px-3 py-2 text-sm font-semibold text-black-50 shadow-sm hover:bg-black-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSave}
          className="rounded-md bg-black-1000 px-3 py-2 text-sm font-semibold text-black-50 shadow-sm hover:bg-black-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
