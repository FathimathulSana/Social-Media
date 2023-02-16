import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPass } from "../../actions/AuthAction";
import { toast } from "react-hot-toast";
import "../OtpVerification/OtpVerification.css";
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ForgotPass = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            return toast.error("Enter Your email!");
        }
        if (email && !emailRegex.test(email)) {
            return toast.error("enter valid email");
        }
        //sent email to reset password
        const response = await dispatch(resetPass(email));
        if (response.response?.data?.error) {
            toast.error(response.response.data.message);
        } else {
            setEmailSent(true);
        }
    };
    return (
        <div className="OtpVerification">
            <div className="otpChild">
                <div className="Heading">
                    <h2>Forgot Your Password!</h2>
                </div>
                {emailSent ? (
                    <p>Instructions to reset your password have been sent to {email}</p>
                ) : (
                    <>
                        <div className="mySpan">
                            <span>
                                Please Enter your email.
                                <br />
                                We will send you a link to reset your password.
                            </span>
                        </div>
                        <div className="code-container">
                            <input
                                type="email"
                                className="codeEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button
                                onClick={(e) => {
                                    handleSubmit(e);
                                }}
                                type="button"
                                className="button fc-button verifyBtn"
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPass;
