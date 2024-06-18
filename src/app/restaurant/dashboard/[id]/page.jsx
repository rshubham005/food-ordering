"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItem = (props) => {
  const [formData, setFormData] = useState({
    food_name: "",
    price: "",
    image_path: "",
    description: "",
    _id: "",
  });
  const router = useRouter();
  console.log(props);
  console.log(props.params.id);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/restaurant/fooditem/${props.params.id}`)
      .then((res) => {
        console.log(res);
        setFormData(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  const [error, setError] = useState(false);
  const editFoodItem = () => {
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
      axios
        .put(
          `http://localhost:3000/api/restaurant/fooditem/${props.params.id}`,
          formData
        )
        .then((res) => {
          if (res.data.success) {
            alert("Food item updated successfully");
            router.push("/restaurant/dashboard");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Edit Food Item</h1>
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
          <button className="button-login" onClick={() => editFoodItem()}>
            Update Food
          </button>
        </div>
      </div>
    </>
  );
};
export default EditFoodItem;
