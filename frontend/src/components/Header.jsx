import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DropMenu from "./DropMenu";
import SubMenu from "./SubMenu";
import "../scss/header.scss";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import InfoContext from "../context/InfoContext";
import MySnackbar from "./MySnackbar";
import { fetcher } from "../utils";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const history = useHistory();
  const [cart] = useContext(CartContext);
  const [info, setInfo] = useContext(InfoContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [collapse, setCollapse] = useState(true);
  const [loading, setLoading] = useState(false);
  const logOut = async () => {
    setLoading(true);
    try {
      const response = await fetcher("/api/logout", { method: "POST" });
      setAuth(null);
      history.replace("/");
      setInfo({ message: response.message, severity: "success" });
    } catch (err) {
      setInfo({ message: err.message, severity: "error" });
    }
    setLoading(false);
  };
  const submitSearch = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const q = form.get("q");
    if (!q) return;
    history.replace(`/search?q=${q}`);
    e.target.reset();
  };

  useEffect(() => {
    setCollapse(true); // reset on page transitions
  }, [useLocation()]);
  return (
    <>
      {info.message && <MySnackbar info={info} setInfo={setInfo} />}
      <nav className="navbar navbar-expand-xl navbar-light">
        <div className="navbar-start my-3">
          <Link className="navbar-brand mr-0" to="/">
            <img src="images/logo.png" alt="Mafroushati" />
          </Link>
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
        </div>
        <div
          className={(collapse ? "collapse" : "") + " navbar-collapse ml-xl-5"}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <DropMenu title="Living Room">
              <SubMenu title="Sofa">
                <Link to="/category/sofa+sets">Sofa Sets</Link>
              </SubMenu>
              <SubMenu title="Chairs">
                <Link to="/category/lounge+chairs">Lounge Chairs</Link>
              </SubMenu>
              <SubMenu title="Tables">
                <Link to="/category/coffee+tables">Coffee Tables</Link>
              </SubMenu>
              <SubMenu title="Storage">
                <Link to="/category/bookshelves">Bookshelves</Link>
                <Link to="/category/tv+units">TV Units</Link>
                <Link to="/category/shoe+racks">Shoe Racks</Link>
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
                <Link to="/category/dining+tables">Dining Tables</Link>
              </SubMenu>
              <SubMenu title="Chairs">
                <Link to="/category/dining+chairs">Dining Chairs</Link>
              </SubMenu>
              <SubMenu title="Storage">
                <Link to="/category/kitchen+cabinets">Kitchen Cabinets</Link>
              </SubMenu>
            </DropMenu>
            <DropMenu title="Storage">
              <SubMenu title="Living Room">
                <Link to="/category/bookshelves">Bookshelves</Link>
                <Link to="/category/tv+units">TV Units</Link>
                <Link to="/category/shoe+racks">Shoe Racks</Link>
              </SubMenu>
              <SubMenu title="Bedroom">
                <Link to="/category/bookshelves">Bookshelves</Link>
                <Link to="/category/cupboards">Cupboards</Link>
              </SubMenu>
              <SubMenu title="Dining">
                <Link to="/category/kitchen+cabinets">Kitchen Cabinets</Link>
              </SubMenu>
            </DropMenu>
            <li className="nav-item">
              <Link className="nav-link" to="/contact_us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <form onSubmit={submitSearch}>
            <input type="text" name="q" maxLength="50" />
            <input type="submit" value="Search" />
          </form>
          <div
            className="position-relative align-self-end d-md-flex flex-row text-center"
            style={{ top: "20px" }}
          >
            {auth ? (
              <div>
                <span>{auth.username}</span>
                <button onClick={logOut}>
                  Log Out
                  {loading && (
                    <span className="ml-2 spinner-grow spinner-grow-sm"></span>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login">Log in</Link>
                {" | "}
                <Link to="/register">Register</Link>
              </div>
            )}
            <div className="ml-2 mt-2 mt-md-0">
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
        </div>
      </nav>
    </>
  );
}
