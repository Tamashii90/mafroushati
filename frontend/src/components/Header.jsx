import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DropMenu from "./DropMenu";
import SubMenu from "./SubMenu";
import "../scss/header.scss";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import InfoContext from "../context/InfoContext";
import MySnackbar from "./MySnackbar";
import { fetcher } from "../utils";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const [cart] = useContext(CartContext);
  const [info, setInfo] = useContext(InfoContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [collapse, setCollapse] = useState(true);
  const logOut = async () => {
    try {
      const response = await fetcher("/logout", { method: "POST" });
      setAuth(null);
      setInfo({ message: response.message, severity: "success" });
    } catch (err) {
      setInfo({ message: err.message, severity: "error" });
    }
  };

  useEffect(() => {
    setCollapse(true); // reset on page transitions
  }, [useLocation()]);
  return (
    <>
      {info.message && <MySnackbar info={info} setInfo={setInfo} />}
      <nav className="navbar navbar-expand-xl navbar-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setCollapse(!collapse)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={(collapse ? "collapse" : "") + " navbar-collapse ml-xl-5"}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link mb-3" to="/">
                Home
              </Link>
            </li>
            <DropMenu title="Living Room">
              <SubMenu title="Sofa">
                <Link to="/category/sofa_sets">Sofa Sets</Link>
              </SubMenu>
              <SubMenu title="Chairs">
                <Link to="/category/lounge_chairs">Lounge Chairs</Link>
              </SubMenu>
              <SubMenu title="Tables">
                <Link to="/category/coffee_tables">Coffee Tables</Link>
              </SubMenu>
              <SubMenu title="Storage">
                <Link to="/category/bookshelves">Bookshelves</Link>
                <Link to="/category/tv_units">TV Units</Link>
                <Link to="/category/shoe_racks">Shoe Racks</Link>
              </SubMenu>
            </DropMenu>
            <DropMenu title="Bedroom">
              <SubMenu title="Beds">
                <Link to="/category/beds">Beds</Link>
              </SubMenu>
              <SubMenu title="Mattresses">
                <Link to="/category/mattresses">Mattresses</Link>
              </SubMenu>
              <SubMenu title="Storage">
                <Link to="/category/bookshelves">Bookshelves</Link>
                <Link to="/category/cupboards">Cupboards</Link>
              </SubMenu>
            </DropMenu>
            <DropMenu title="Dining">
              <SubMenu title="Tables">
                <Link to="/category/dining_tables">Dining Tables</Link>
              </SubMenu>
              <SubMenu title="Chairs">
                <Link to="/category/dining_chairs">Dining Chairs</Link>
              </SubMenu>
              <SubMenu title="Storage">
                <Link to="/category/kitchen_cabinets">Kitchen Cabinets</Link>
              </SubMenu>
            </DropMenu>
            <DropMenu title="Storage">
              <SubMenu title="Living Room">
                <Link to="/category/bookshelves">Bookshelves</Link>
                <Link to="/category/tv_units">TV Units</Link>
                <Link to="/category/shoe_racks">Shoe Racks</Link>
              </SubMenu>
              <SubMenu title="Bedroom">
                <Link to="/category/bookshelves">Bookshelves</Link>
                <Link to="/category/cupboards">Cupboards</Link>
              </SubMenu>
              <SubMenu title="Dining">
                <Link to="/category/kitchen_cabinets">Kitchen Cabinets</Link>
              </SubMenu>
            </DropMenu>
            <li className="nav-item">
              <Link className="nav-link" to="/contact_us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end my-3">
          {auth ? (
            <div>
              <span>{auth.username}</span>
              <button onClick={logOut}>Log Out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Log in</Link>
              {" | "}
              <Link to="/register">Register</Link>
            </div>
          )}
          <div className="mt-xl-3">
            <Link to="/cart">
              <FaShoppingCart size="25px" className="ml-xl-1" color="red" />
            </Link>
            <span
              className="badge badge-secondary"
              style={{ position: "relative", bottom: "10px" }}
            >
              {cart.products.length}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
