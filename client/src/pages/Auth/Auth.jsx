import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, reset } from "../../actions/AuthAction";
import Alert from "../../components/Alert/Alert";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/AuthRequests";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

const Auth = () => {
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.authReducer);
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmpass: "",
    });

    const [validationMessage, setValidationMessage] = useState("");

    const handleChange = (e) => {
        dispatch(reset());
        const name = e.target.name;
        const value = e.target.value;
        setData((preData) => {
            return {
                ...preData,
                [name]: value,
            };
        });
        setValidationMessage("");
    };

    const validate = () => {
        if (data.email && !emailRegex.test(data.email)) {
            setValidationMessage("Please enter a valid email");
            return false;
        }

        if (!usernameRegex.test(data.username)) {
            setValidationMessage("Enter a valid username no special character no whitespace");
            return false;
        }

        if (data.password.length < 5) {
            setValidationMessage("Password minimum length is 5");
            return false;
        }

        if (isSignUp && data.confirmpass !== data.password) {
            setValidationMessage("password doesn't matching");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(reset());
        if (!isSignUp && validate()) {
            return dispatch(logIn(data));
        }
        if (validate()) {
            const response = await signUp(data);
            navigate("/otpverification", {
                state: {
                    registerationData: response.data,
                },
            });
        }
    };

    const resetForm = () => {
        setData({ firstname: "", lastname: "", username: "", email: "", password: "", confirmpass: "" });
        setValidationMessage("");
    };
    useEffect(() => {
        dispatch(reset());
    }, []);
    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <h6>INFLUENCE AND INSPIRE</h6>
            </div>
            {/* <SignUp and Login /> */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                                onChange={handleChange}
                                value={data.firstname}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="infoInput"
                                name="lastname"
                                onChange={handleChange}
                                value={data.lastname}
                                required
                            />
                        </div>
                    )}
                    <div>
                        {isSignUp ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="infoInput"
                                    name="username"
                                    onChange={handleChange}
                                    value={data.username}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="infoInput"
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    required
                                />
                            </>
                        ) : (
                            <input
                                type="text"
                                placeholder="Username"
                                className="infoInputLogin"
                                name="username"
                                onChange={handleChange}
                                value={data.username}
                                required
                            />
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="infoInput"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="infoInput"
                                name="confirmpass"
                                onChange={handleChange}
                                value={data.confirmpass}
                                required
                            />
                        )}
                    </div>
                    {validationMessage && (
                        <Alert message={validationMessage} handleCloseAlert={() => setValidationMessage("")} />
                    )}

                    {error && <Alert message={message} handleCloseAlert={() => dispatch(reset())} />}
                    <div>
                        <span
                            style={{ fontSize: "12px", cursor: "pointer" }}
                            onClick={() => {
                                setIsSignUp((prev) => !prev);
                                resetForm();
                            }}
                        >
                            {isSignUp ? "ALREADY HAVE AN ACCOUNT? LOGIN" : "NEW TO REACHME? SIGNUP"}
                        </span>
                    </div>
                    <div>
                        <Link style={{ color: "inherit", marginTop: "-80px" }} to="../forgotpass">
                            {" "}
                            <span style={{ fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>
                                {isSignUp ? "" : "Forgot Password?"}
                            </span>
                        </Link>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading}>
                        {loading ? "Loading..." : isSignUp ? "Signup" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
