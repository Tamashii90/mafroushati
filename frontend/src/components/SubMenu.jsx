import React from "react";

export default function SubMenu({ title, children }) {
  if (!(children instanceof Array)) children = new Array(children);
  return (
    <ul>
      <li>
        <span className="dropdown-header">{title}</span>
      </li>
      {children.map((child, idx) => (
        <li key={idx} className="dropdown-item">
          {child}
        </li>
      ))}
    </ul>
  );
}
