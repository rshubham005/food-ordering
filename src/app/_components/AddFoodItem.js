import axios from "axios";
import { useState } from "react";

const AddFoodItem = () => {
  const [formData, setFormData] = useState({
    food_name: "",
    price: "",
    image_path: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const addNewFoodItem = () => {
    if (
      formData.price == "" ||
      formData.image_path == "" ||
      formData.food_name == "" ||
      formData.description == ""
    ) {
      setError(true);
    } else {
      setError(false);

      console.log(formData);
      let restData = JSON.parse(localStorage.getItem("resAuthData"));
      // console.log(restData._id)
      let data = { ...formData, restro_id: restData._id };
      console.log(data);
      axios
        .post("http://localhost:3000/api/restaurant/foods", data)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            alert("Food item added successfully");
            setFormData({
              food_name: "",
              price: "",
              image_path: "",
              description: "",
            });
          } else {
            alert("Food item not added");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div>
        <h1>Add Food Item</h1>
        <div className="input-block">
          <input
            className="input-field"
            type="text"
            placeholder="Enter food name"
            name="food_name"
            value={formData.food_name}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          {error && formData.food_name == "" ? (
            <span className="input-error">Food name is required</span>
          ) : null}
        </div>
        <div className="input-block">
          <input
            className="input-field"
            type="text"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          {error && formData.price == "" ? (
            <span className="input-error">Price is required</span>
          ) : null}
        </div>
        <div className="input-block">
          <input
            className="input-field"
            type="text"
            placeholder="Enter file path"
            name="image_path"
            value={formData.image_path}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          {error && formData.image_path == "" ? (
            <span className="input-error">Image path is required</span>
          ) : null}
        </div>
        <div className="input-block">
          <input
            className="input-field"
            type="text"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          {error && formData.description == "" ? (
            <span className="input-error">Description is required</span>
          ) : null}
        </div>
        <div className="input-block">
          <button className="button-login" onClick={() => addNewFoodItem()}>
            Add Food
          </button>
        </div>
      </div>
    </>
  );
};
export default AddFoodItem;
