"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const router = useRouter();
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userAuthData")) || {}
  );
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    if (props.cartData) {
      setCartData(props.cartData);
      if (props.cartData && props.cartData.length > 0) {
        localStorage.setItem("cart", JSON.stringify(props.cartData));
      }
    }
  }, [props?.cartData]);
  console.log(cartData);
  const handleLogout = () => {
    localStorage.removeItem("userAuthData");
    setAuth(JSON.parse(localStorage.getItem("userAuthData")) || {});
  };
  return (
    <>
      <div className="header">
        <div className="Logo_div">
          <h1>Food Delivery</h1>
        </div>
        <div className="menu_group">
          <ul className="menu_list">
            <li className="list_item">
              <Link href="/">Home</Link>
            </li>
            {auth && auth.name ? (
              <li className="list_item">
                <Link href="#">{auth.name}</Link>
              </li>
            ) : null}
            {auth && auth.name ? (
              <li className="list_item">
                <Link href="#" onClick={() => handleLogout()}>
                  Logout
                </Link>
              </li>
            ) : (
              <li className="list_item">
                <Link href="/user_auth">Login/SignUp</Link>
              </li>
            )}
            <li className="list_item">
              <Link href="/cart">Cart({cartData ? cartData.length : 0})</Link>
            </li>
            <li className="list_item">
              <Link href="/restaurant">Add Restaurant</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default CustomerHeader;
