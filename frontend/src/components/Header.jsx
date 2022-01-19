import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DropMenu from "./DropMenu";
import SubMenu from "./SubMenu";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { toast } from "react-toastify";
import { fetcher } from "../utils";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function Header() {
	const history = useHistory();
	const [cart] = useContext(CartContext);

	const [auth, setAuth] = useContext(AuthContext);
	const [collapse, setCollapse] = useState(true);
	const [loading, setLoading] = useState(false);
	const imageUrl = new URL("/assets/logo.svg", import.meta.url);

	const logOut = async () => {
		setLoading(true);
		try {
			const response = await fetcher("/api/logout", { method: "POST" });
			history.push("/");
			setAuth(null);
			toast.success("Logged Out Successfully.");
		} catch (err) {
			toast.error(err.message);
		}
		setLoading(false);
	};
	const submitSearch = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		const q = form.get("q");
		if (!q) return;
		history.push(`/search?q=${q}`);
		e.target.reset();
	};

	useEffect(() => {
		setCollapse(true); // reset on page transitions
	}, [useLocation()]);
	return (
		<>
			<nav className="navbar navbar-expand-xl navbar-light pb-5 pb-xl-3">
				<div className="navbar-start my-3">
					<Link className="navbar-brand mr-0" to="/">
						<img src={imageUrl} alt="Mafroushati" style={{ height: "90px" }} />
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
				<div className={(collapse ? "collapse" : "") + " navbar-collapse ml-xl-5"} id="navbarNav">
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
							</SubMenu>
						</DropMenu>
						<DropMenu title="Bedroom">
							<SubMenu title="Beds">
								<Link to="/category/beds">Beds</Link>
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
							<SubMenu title="Storage">
								<Link to="/category/kitchen+cabinets">Kitchen Cabinets</Link>
							</SubMenu>
						</DropMenu>
						<DropMenu title="Storage">
							<SubMenu title="Living Room">
								<Link to="/category/bookshelves">Bookshelves</Link>
								<Link to="/category/tv+units">TV Units</Link>
							</SubMenu>
							<SubMenu title="Bedroom">
								<Link to="/category/bookshelves">Bookshelves</Link>
								<Link to="/category/cupboards">Cupboards</Link>
							</SubMenu>
							<SubMenu title="Dining">
								<Link to="/category/kitchen+cabinets">Kitchen Cabinets</Link>
							</SubMenu>
						</DropMenu>
						<li className="nav-item mb-3 mb-xl-0">
							<Link className="nav-link" to="/contact_us">
								Contact Us
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/about">
								About
							</Link>
						</li>
					</ul>
				</div>
				<div className="navbar-end mr-xl-1">
					<form onSubmit={submitSearch}>
						<div className="input-group w-75 ml-xl-auto">
							<input
								className="form-control"
								type="text"
								name="q"
								maxLength="50"
								placeholder="Search.."
							/>
							<div className="input-group-append ml-2">
								<button type="submit" style={{ border: "none", background: "none" }}>
									<FaSearch color="#007bff" size="25px" />
								</button>
							</div>
						</div>
					</form>
					<div
						className="position-relative align-self-end d-md-flex flex-row text-center"
						style={{ top: "20px" }}
					>
						{auth ? (
							<div id="logout">
								<span>{auth.username}</span>
								<button
									title="Log out"
									onClick={logOut}
									style={{ border: "none", background: "none" }}
								>
									<RiLogoutCircleRLine color="#007bff" size="25px" />
									{loading && <span className="ml-2 spinner-grow spinner-grow-sm"></span>}
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
								<FaShoppingCart size="25px" className="ml-xl-1" color="#00ff84" />
							</Link>
							<span
								className="badge badge-primary text-white"
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
