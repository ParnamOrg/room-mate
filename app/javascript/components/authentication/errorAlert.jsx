import React from "react";
import { BiSolidError } from "react-icons/bi";
import { ImCross } from "react-icons/im";

const errorAlert = (props) => {
    return (
        <div className={`alert-div d-flex justfiy-content-between ${props.class}`} style={{backgroundColor: props.color}}>
            <div className="d-flex">
                <span className=" pt-2 pe-2 ps-3 fs-4"><BiSolidError /></span>
                <span className="vh-60 d-flex align-items-center">{props.message}</span>
            </div>
            <div className="pt-3">
                <button className="alert-button pe-3" onClick={props.onclick}><ImCross /></button>
            </div>
        </div>
    )
}

export default errorAlert;
