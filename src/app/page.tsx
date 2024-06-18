"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CutomerHeader";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locationList, setLocationList] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    food_name: "",
  });
  const [restaurantList, setRestaurantList] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter()
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customer/location")
      .then((res) => {
        console.log(res);
        setLocationList(res.data.result);
      })
      .catch((err) => console.log(err));
    fetchRestaurants("");
  }, []);
  const fetchRestaurants = (data: any) => {
    axios
      .get(`http://localhost:3000/api/customer?location=${data}`)
      .then((res) => {
        console.log(res);
        setRestaurantList(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  const fetchRestaurants2 = (data: any) => {
    axios
      .get(`http://localhost:3000/api/customer?restaurant=${data}`)
      .then((res) => {
        console.log(res);
        setRestaurantList(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <CustomerHeader />
      <div className="hero_banner">
        {" "}
        <h1 className="home_heading">Food Delivery App</h1>
        <div className="search_box">
          <input
            className="address"
            name="address"
            onClick={() => setOpen(true)}
            type="text"
            value={formData.address}
            placeholder="Enter Location"
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              fetchRestaurants(e.target.value);
            }}
          />
          {open ? (
            <div className="selection_box">
              {locationList.map((item) => (
                <p
                  className="selection_item"
                  onClick={() => {
                    setFormData({ ...formData, address: item });
                    setOpen(false);
                    fetchRestaurants(item);
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          ) : null}
          <input
            className="food_name"
            name="food_name"
            type="text"
            value={formData.food_name}
            placeholder="Search restaurant name"
            onChange={(e) =>
              {setFormData({ ...formData, [e.target.name]: e.target.value })
              fetchRestaurants2(e.target.value);}
            }
          />
        </div>
      </div>
      <div className="restro_list" >
        {restaurantList.map((item) => (
          <div className="restaurant_box" onClick={()=>{router.push(`/explore/${item._id}`)}}>
            <h3>{item.restaurant_name}</h3>
            <p>Contact : {item.number} </p>
            <p>Address: {item.address}</p>
          </div>
        ))}
      </div>
    </>
  );
}
