"use client";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodList from "@/app/_components/FoodList";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [addFood, setAddFood] = useState(false);
  // useEffect(() => {
  //   let data = localStorage.getItem("resAuthData");
  //   if (!data) {
  //     router.push("/restaurant");
  //   }
  // }, []);
  return (
    <>
      <RestaurantHeader />
      <div>
        <button onClick={() => setAddFood(true)}>Add Food</button>{" "}
        <button onClick={() => setAddFood(false)}>Dashboard</button>
        {addFood ? <AddFoodItem /> : <FoodList />}
      </div>
      <RestaurantFooter />
    </>
  );
};
export default Dashboard;
