import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../../actions/AuthAction";
import Logo from "../../../img/logo.png";
import "../../Auth/Auth.css";

const AdminAuth = () => {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.adminAuthReducer.loading);
    const userDataChange = (event) => {
        setUserData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    };
    const submitData = (event) => {
        event.preventDefault();

        dispatch(adminLogin(userData));
    };
    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <h6>INFLUENCE AND INSPIRE</h6>
            </div>
            {/* <SignUp and Login /> */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={submitData}>
                    <h3>Admin Login</h3>

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="infoInputLogin"
                            name="username"
                            value={userData.username}
                            onChange={userDataChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="infoInput"
                            name="password"
                            value={userData.password}
                            onChange={userDataChange}
                            required
                        />
                    </div>

                    <button className="button infoButton" type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAuth;
