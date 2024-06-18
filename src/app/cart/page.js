"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CutomerHeader";

const Cart = () => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(cartData);

  const handleRemoveKartItem = (item) => {
    let temp = cartData;
    temp.splice(temp.indexOf(item), 1);
    setCartData([...temp]);
    console.log(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };
  const getTotalPricing = () => {
    let price_arr=[]
    cartData.map((item) => price_arr.push(parseInt(item.price)))
    console.log(price_arr)
    let total = price_arr.reduce(
      (partialSum, a) => partialSum + parseInt(a),
      0
    );
    setTotalPrice(total);
  };
  useEffect(() => {
    getTotalPricing();
  }, []);
  return (
    <>
      <CustomerHeader cartData={cartData} />
      {cartData.map((item) => (
        <div className="cart_items">
          <div className="food_image">
            <p>{item.image_path}</p>
          </div>
          <div className="food_description">
            <div className="name_price">
              <p>{item.food_name}</p>
              <p>Price : {item.price} Rs</p>
            </div>
            <p>{item.description}</p>
            <button
              className="cart_button"
              onClick={() => handleRemoveKartItem(item)}
            >
              Remove from cart
            </button>
          </div>
        </div>
      ))}
      <div className="total_pricing">
        <div className="total_tax">
          <div className="price_box">
            <p> Food Charges :</p>
            <p>{totalPrice}</p>
          </div>
          <div className="price_box">
            <p>Tax</p> <p>{totalPrice / 10}</p>
          </div>
          <div className="price_box">
            <p>Delivery Charge:</p> <p>100</p>
          </div>
          <div className="price_box">
            <p>Total:</p> <p>{totalPrice + totalPrice / 10 + 100}</p>
          </div>
        </div>
        <div>
          <button className="cart_button">Order Now</button>
        </div>
      </div>
    </>
  );
};
export default Cart;
