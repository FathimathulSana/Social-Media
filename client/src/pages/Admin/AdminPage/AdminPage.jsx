import React from "react";
import { useState } from "react";
import MainDash from "../../../components/MainDash/MainDash";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AdminPage.css";

const AdminPAge = () => {
    const [mainDashItem, setMainDashItem] = useState(0);
    return (
        <div className="adminPage">
            <div className="appGlass">
                <Sidebar setMainDashItem={setMainDashItem} />
                <MainDash mainDashItem={mainDashItem} />
            </div>
        </div>
    );
};

export default AdminPAge;
