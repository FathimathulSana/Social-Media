import React from "react";
import "./Sidebar.css";
import { IoLogOut } from "react-icons/io5";
import Logo from "../../img/logo.png";
import { SidebarData } from "../../Data/SidebarData";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminLogOut } from "../../actions/AuthAction";

const Sidebar = ({ setMainDashItem }) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        setMainDashItem(selected);
    }, [selected]);

    const handleLogOut = () => {
        dispatch(adminLogOut());
    };
    return (
        <div className="Sidebar">
            {/* LOGO */}
            <div className="logo">
                <img src={Logo} width="90%" alt="" />
            </div>
            {/* menu */}
            <div className="menu">
                {SidebarData.map((item, index) => {
                    return (
                        <div
                            className={selected === index ? "menuItem active" : "menuItem"}
                            key={index}
                            onClick={() => setSelected(index)}
                        >
                            <span>
                                <item.icon />
                            </span>
                            <span>{item.heading}</span>
                        </div>
                    );
                })}
                <div className="menuItem" onClick={handleLogOut}>
                    <IoLogOut />
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
