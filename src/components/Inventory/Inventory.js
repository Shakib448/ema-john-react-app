import React from "react";

const Inventory = () => {
  const handleAddProduct = () => {
    const product = "";
    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };
  return (
    <div>
      <form>
        <p>
          <span>Name:</span>
          <input type="text" />
        </p>
        <p>
          <span>Price :</span>
          <input type="text" />
        </p>
        <p>
          <span>Quantity :</span>
          <input type="text" />
        </p>
        <p>
          <span>Product image:</span>
          <input type="file" />
        </p>
        <button type="submit" onClick={handleAddProduct}>
          {" "}
          Add Product{" "}
        </button>
      </form>
    </div>
  );
};

export default Inventory;
