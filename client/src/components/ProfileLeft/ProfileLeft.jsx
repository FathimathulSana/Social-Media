import React from "react";
import LogoSearch from "../LogoSearch/LogoSearch";
import InfoCard from "../InfoCard/InfoCard";
import { useDispatch, useSelector } from "react-redux";
import { sendVerifiyRequest } from "../../actions/userAction";
import { useParams } from "react-router-dom";

const ProfileLeft = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();
    const params = useParams();

    const sendVerificationRequest = async () => {
        await dispatch(sendVerifiyRequest(user._id));
    };
    return (
        <div className="ProfileSide">
            <LogoSearch place="homeSide" />
            <InfoCard />

            {user.followers.length >= 3 && user.isFamous === "notFamous" && params.id === user._id ? (
                <span className="verifyRequest" onClick={sendVerificationRequest}>
                    Want to be verified ? Apply now{" "}
                </span>
            ) : user.followers.length >= 3 && user.isFamous === "pending" && params.id === user._id ? (
                <span className="verifyRequestSend">Verify request Send. Please be patient</span>
            ) : (
                ""
            )}
        </div>
    );
};

export default ProfileLeft;
