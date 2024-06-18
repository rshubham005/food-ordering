import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [passError, setPassError] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    restaurant_name: "",
    city: "",
    address: "",
    number: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleFormSubmit = () => {
    if (formData.password != formData.confirm_password) {
      setPassError(true);
    } else {
      setPassError(false);
    }
    if (
      formData.address == "" ||
      formData.restaurant_name == "" ||
      formData.city == "" ||
      formData.email == "" ||
      formData.number == "" ||
      formData.password == "" ||
      formData.confirm_password == ""
    ) {
      setError(true);
    }
    else{
      setError(false)
    }
    console.log(formData);
    if (!error && !passError) {
      axios
        .post("http://localhost:3000/api/restaurant", formData)
        .then((res) => {
          console.log(res.data.result);
          alert("restaurant registered successfully");
          if (res.data.success) {
            let tokenData = res.data.result;
            delete tokenData.password;
            localStorage.setItem("resAuthData", JSON.stringify(tokenData));
            router.push("/restaurant/dashboard");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <h1>Signup Page</h1>
      <div className="input-block">
        <input
          className="input-field"
          required={true}
          type="text"
          placeholder="Enter restuarant name"
          value={formData.restaurant_name}
          name="restaurant_name"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        {error && formData.restaurant_name == "" ? (
          <span className="input-error">Restaurant name is required</span>
        ) : null}
      </div>
      <div className="input-block">
        <input
          className="input-field"
          required={true}
          type="text"
          placeholder="Enter City"
          value={formData.city}
          name="city"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        {error && formData.city == "" ? (
          <span className="input-error">City name is required</span>
        ) : null}
      </div>
      <div className="input-block">
        <input
          className="input-field"
          required={true}
          type="text"
          placeholder="Enter Full Address"
          name="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        {error && formData.address == "" ? (
          <span className="input-error">Address is required</span>
        ) : null}
      </div>
      <div className="input-block">
        <input
          className="input-field"
          required={true}
          type="text"
          placeholder="Enter Phone Number"
          name="number"
          value={formData.number}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        {error && formData.number == "" ? (
          <span className="input-error">Contact Number is required</span>
        ) : null}
      </div>
      <div className="input-block">
        <input
          className="input-field"
          required={true}
          type="text"
          placeholder="Enter email id"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        {error && formData.email == "" ? (
          <span className="input-error">Email is required</span>
        ) : null}
      </div>{" "}
      <div className="input-block">
        <input
          className="input-field"
          required={true}
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        {passError ? (
          <span className="input-error">
            Password and Confirm password are not matching
          </span>
        ) : null}
        {error && formData.password == "" ? (
          <span className="input-error">Password is required</span>
        ) : null}
      </div>
      <div className="input-block">
        <input
          className="input-field"
          required={true}
          type="password"
          placeholder="Confirm password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        {passError ? (
          <span className="input-error">
            Password and Confirm password are not matching
          </span>
        ) : null}
        {error && formData.confirm_password == "" ? (
          <span className="input-error">Confirm Password is required</span>
        ) : null}
      </div>
      <div className="input-block">
        <button className="button-login" onClick={() => handleFormSubmit()}>
          Sign Up
        </button>
      </div>
    </>
  );
};
export default Signup;
