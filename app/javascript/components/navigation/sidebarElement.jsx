import React from "react";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineGroup, MdOutlinePayment, MdHomeWork } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const sidebarElement = [
    {name: "Home", icon: <FaHome className="sidebar-icon-color me-3 ms-2" />},
    {name: "Profile", icon: <CgProfile className="sidebar-icon-color me-3 ms-2" />},
    {name: "Roommates", icon: <MdOutlineGroup className="sidebar-icon-color me-3 ms-2" />},
    {name: "Billing", icon: <MdOutlinePayment className="sidebar-icon-color me-3 ms-2" />},
    {name: "Rooms", icon: <MdHomeWork className="sidebar-icon-color me-3 ms-2" />},
    {name: "Settings", icon: <IoSettings className="sidebar-icon-color me-3 ms-2" />}
];

export default sidebarElement;