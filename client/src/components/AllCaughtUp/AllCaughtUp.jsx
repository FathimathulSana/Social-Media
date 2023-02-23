import "./AllCaughtUp.css";
import React from "react";
import complete from "../../img/all caughtUp.webp";

const AllCaughtUp = () => {
    return (
        <div className="all-caught-up">
            <img src={complete} alt="" />
            You caught up all posts
        </div>
    );
};

export default AllCaughtUp;
