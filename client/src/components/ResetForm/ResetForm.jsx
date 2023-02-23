import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../OtpVerification/OtpVerification.css";
import { resetPassword } from "../../api/AuthRequests";

const ResetForm = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = params.token;
        if (!password || !confirmPass) {
            return toast.error("Passwords are empty!");
        }
        if (password !== confirmPass) {
            return toast.error("Passwords do not match");
        }
        if (password.length < 5) {
            return toast.error("Password minimum length is 5");
        }
        try {
            const response = await resetPassword(token, password);
            if (!response?.data?.error) {
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error.response.data);
            return toast.error(error.response.data.message);
        }
    };
    return (
        <div className="OtpVerification">
            <div className="otpChild">
                <div className="Heading">
                    <h2>Reset your Password!</h2>
                </div>

                <div className="mySpan">
                    <span>Enter the password and Confirm Password you want to reset.</span>
                </div>
                <div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="codeEmail"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="codeEmail"
                            name="confirmpass"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <button onClick={handleSubmit} type="button" className="button fc-button verifyBtn">
                        Conform
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetForm;
