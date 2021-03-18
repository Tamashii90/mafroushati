import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>
              <Link to="/" style={{ textDecoration: "none", color: "#1c1c1c" }}>
                Mafroushati
              </Link>
            </h2>
          </div>
          <div className="col-12 col-md-6">
            <ul style={{ listStyleType: "none" }}>
              <li>
                <span className="mr-2">{"\u{1F30F}"}</span>
                <span>Damascus, Syria</span>
              </li>
              <li>
                <span className="mr-2">{"\u{1F4DE}"}</span>
                <span>+963-11-0000000</span>
              </li>
              <li>
                <span className="mr-2">{"\u2709\uFE0F"}</span>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <span className="mr-2">{"\u2139\uFE0F"}</span>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="col-12">
            <h6 className="text-center pt-5">
              Copyright {new Date().getFullYear()} {"\u00A9\uFE0F"} Mafroushati
              inc.
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
}
