import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DropMenu({ title, children }) {
  // in case only one child is passed, turn it into an array of 1
  if (!(children instanceof Array)) children = new Array(children);

  const visible = { visibility: "visible", opacity: 1 };
  const hidden = { visibility: "hidden", opacity: 0, height: 0 };
  const [style, setStyle] = useState(visible);

  useEffect(() => {
    setStyle(hidden); // close navbar on page transitions
  }, [useLocation()]);

  const showMenu = () => {
    setStyle(visible);
  };
  const hideMenu = e => {
    setStyle(hidden);
  };

  return (
    <li className="nav-item">
      <div className="dropdown" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
        <span className="nav-link">{title}</span>
        <div className="dropdown-menu" style={style}>
          <div className="row">
            {children.map((subMenu, idx) => (
              <div key={idx} className="col-md-4 col-sm-6">
                {subMenu}
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
