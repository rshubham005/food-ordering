import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodList = () => {
  const [foodList, setFoodList] = useState([]);
  const router = useRouter();
  const fetchFoodItemList = () => {
    let restro_id = JSON.parse(localStorage.getItem("resAuthData"))._id;
    axios
      .get(`http://localhost:3000/api/restaurant/foods/${restro_id}`)
      .then((res) => {
        console.log(res);
        setFoodList(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchFoodItemList();
  }, []);
  const handleFoodItemDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/restaurant/foods/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Food item deleted successfully");
          fetchFoodItemList();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div style={{ width: "100%" }}>
        {" "}
        <h1>Food List</h1>
        <table className="table">
          <thead>
            {" "}
            <tr className="table_row">
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((item) => (
              <tr className="table_row">
                <td>{item.food_name}</td>
                <td>{item.price}</td>
                <td>{item.image_path}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    onClick={() =>
                      router.push(`/restaurant/dashboard/${item._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleFoodItemDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default FoodList;
