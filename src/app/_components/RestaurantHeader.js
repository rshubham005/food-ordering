import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const router = useRouter();
  const [auth, setAuth] = useState();
  useEffect(() => {
    let data = localStorage.getItem("resAuthData");
    if (!data) {
      router.push("/restaurant");
    } else {
      setAuth(JSON.parse(data));
      router.push("/restaurant/dashboard");
    }
  }, []);
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
            {auth && auth.restaurant_name ? (
              <li className="list_item">
                <Link href="/">Logout</Link>
              </li>
            ) : (
              <li className="list_item">
                <Link href="/">Login/SignUp</Link>
              </li>
            )}
            {auth && auth.restaurant_name ? (
              <li className="list_item">
                <Link href="/">Profile</Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};
export default RestaurantHeader;
