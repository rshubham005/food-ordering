"use client";
import CustomerHeader from "@/app/_components/CutomerHeader";
import axios from "axios";
import { useEffect, useState } from "react";

const RestaurantDetail = (props) => {
  const [foods, setFoods] = useState([]);
  const [restroDetails, SetRestroDetails] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartId, setCartId] = useState(() => cart.map((item) => item._id));
  console.log(cartId);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/restaurant/${props.params.page}`)
      .then((res) => {
        console.log(res);
        SetRestroDetails(res.data.details);
        setFoods(res.data.foods);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleRemoveKartItem = (item) => {
    let temp = cart;
    temp.splice(temp.indexOf(item), 1);
    setCart([...temp]);
    setCartId(() => temp.map((item) => item._id));
    console.log(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };
  return (
    <>
      <CustomerHeader cartData={cart} />
      <div className="hero_banner">
        {" "}
        <h1 className="home_heading">{restroDetails.restaurant_name}</h1>
      </div>
      <div className="detail">
        <p>Contact : {restroDetails.number}</p>
        <p>Address : {restroDetails.address}</p>
        <p>City : {restroDetails.city}</p>
        <p>email : {restroDetails.email}</p>
      </div>
      <div className="restro_list">
        {foods.map((item) => (
          <div className="restaurant_box">
            <h3>{item.food_name}</h3>
            <p>Price : {item.price} INR</p>
            <p>Image Path: {item.image_path}</p>
            <p>Description: {item.description}</p>
            {cartId.includes(item._id) ? (
              <button
                className="cart_button"
                onClick={() => {
                  handleRemoveKartItem(item);
                }}
              >
                Remove from cart
              </button>
            ) : (
              <button
                className="cart_button"
                onClick={() => {
                  let temp = [...cart, item];
                  setCart((cart) => [...cart, item]);
                  setCartId(() => temp.map((item) => item._id));
                }}
              >
                Add to cart
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default RestaurantDetail;
