import React, { useEffect } from "react";
import SidebarElement from "./sidebarElement"; 

const Element = (props) => {
  return (
    <li className="sidebar-element-li d-flex justify-content-left align-items-center">
      <div className="sidebar-icon-bg me-3">{props.icon}</div>
      {props.name}
    </li>
  );
};

const sidebar = () => {
    const imagePath = "/assets/human.jpeg";

  return (
    <div className="sidebar-div">
      <span className="sidebar-image-circle">
        <img src={imagePath} className="sidebar-image" alt="Human" />
      </span>
      <div
        className="position-relative vw-370 text-center align-items-center"
        style={{ top: 215 }}
      >
        <p className="sidebar-top-text fw-bold">Parth Verma</p>
        <p className="sidebar-top-text fw-bold">E22CSEU0181</p>
        <p className="sidebar-top-text fw-bold">B.Tech CSE</p>
      </div>
      <span className="sidebar-bottom-line"></span>
      <ul className="sidebar-element-ul">
        {SidebarElement.map((element) => {
          return <Element name={element.name} icon={element.icon} />;
        })}
      </ul>
    </div>
  );
};

export default sidebar;
