import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleLogin = () => {
    if (formData.email == "" || formData.password == "") {
      setError(true);
    } else {
      setError(false);
      axios
        .post("http://localhost:3000/api/restaurant/login", formData)
        .then((res) => {
          if (res.data.success) {
            let token_data = res.data.result
            delete token_data.password
            localStorage.setItem(
              "resAuthData",
              JSON.stringify(token_data)
            );
            alert("Login Successful");
            router.push("/restaurant/dashboard"); 
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <h1>Login Page</h1>
      <div className="input-block">
        <input
          className="input-field"
          type="text"
          placeholder="Enter email id"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />{" "}
        {error && formData.email == "" ? (
          <span className="input-error">Email is required</span>
        ) : null}
      </div>{" "}
      <div className="input-block">
        <input
          className="input-field"
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />{" "}
        {error && formData.password == "" ? (
          <span className="input-error">Password is required</span>
        ) : null}
      </div>
      <div className="input-block">
        <button className="button-login" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </>
  );
};
export default Login;
