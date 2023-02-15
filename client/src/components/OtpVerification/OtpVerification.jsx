import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { reset, verifyotp } from "../../actions/AuthAction";
import { toast } from "react-hot-toast";
import "./OtpVerification.css";
import { resendotp } from "../../api/AuthRequests";
import Alert from "../Alert/Alert";

const OtpVerification = () => {
    const { error, message } = useSelector((state) => state.authReducer);
    const [otpOne, setOtpOne] = useState("");
    const [otpTwo, setOtpTwo] = useState("");
    const [otpThree, setOtpThree] = useState("");
    const [otpFour, setOtpFour] = useState("");
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const location = useLocation();
    const dispatch = useDispatch();
    let registerationDetails = location?.state?.registerationData;

    //to change the selected input field
    useEffect(() => {
        const codes = document.querySelectorAll(".code");

        codes[0]?.focus();

        codes.forEach((code, idx) => {
            code.addEventListener("keydown", (e) => {
                if (e.key >= 0 && e.key <= 9) {
                    codes[idx].value = "";
                    setTimeout(() => codes[idx + 1]?.focus(), 10);
                } else if (e.key === "Backspace") {
                    setTimeout(() => codes[idx - 1]?.focus(), 10);
                }
            });
        });
    }, []);

    //to update the otp variable

    useEffect(() => {
        setOtp(otpOne + otpTwo + otpThree + otpFour);
    }, [otpOne + otpTwo + otpThree + otpFour]);

    //verify Otp
    const verifyOtp = async (e) => {
        e.preventDefault();
        dispatch(verifyotp(registerationDetails.data.userId, otp));
        if (!error) {
            return toast(`Hi Welcome to ReachMe!`, {
                icon: "🥳",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const resendOtp = async (e) => {
        e.preventDefault();
        setMinutes(1);
        setSeconds(30);
        dispatch(resendotp(registerationDetails.data.email, registerationDetails.data.userId));
    };

    return (
        <div className="OtpVerification">
            <div className="otpChild">
                <div className="Heading">
                    <h2>Verify your account</h2>
                </div>
                <div className="mySpan">
                    <span>
                        We emailed you the six digit code to person@gmail.com <br />
                        Enter the code below to confirm your email address
                    </span>
                </div>
                <div className="code-container">
                    <input
                        type="text"
                        className="code"
                        placeholder="0"
                        min="0"
                        max="9"
                        onChange={(e) => setOtpOne(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="code"
                        placeholder="0"
                        min="0"
                        max="9"
                        onChange={(e) => setOtpTwo(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="code"
                        placeholder="0"
                        min="0"
                        max="9"
                        onChange={(e) => setOtpThree(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="code"
                        placeholder="0"
                        min="0"
                        max="9"
                        onChange={(e) => setOtpFour(e.target.value)}
                        required
                    />
                </div>
                {error && <Alert message={message} handleCloseAlert={() => dispatch(reset())} />}
                <div>
                    <button
                        type="button"
                        className="button fc-button verifyBtn"
                        onClick={(e) => {
                            verifyOtp(e);
                        }}
                    >
                        Verify
                    </button>
                </div>

                <small className="countdown-text">
                    {seconds > 0 || minutes > 0 ? (
                        <p>
                            Time Remaining : {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                    ) : (
                        <p>Didn't recieve the code?</p>
                    )}
                    <strong
                        disabled={seconds > 0 || minutes > 0}
                        style={{
                            marginLeft: "50px",
                            cursor: "pointer",
                            color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#000000",
                        }}
                        onClick={(e) => {
                            resendOtp(e);
                        }}
                    >
                        RESEND
                    </strong>
                </small>
            </div>
        </div>
    );
};

export default OtpVerification;
