import React, { useState } from "react";
import "./RightSide.css";
import { ImHome } from "react-icons/im";
import { RiChat1Fill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { IoPersonCircle } from "react-icons/io5";
import { IoNotificationsCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowersCard from "../FollowersCard/FollowersCard";
import SettingsModal from "../SettingsModal/SettingsModal";
import NotificationModal from "../NotificationModal/NotificationModal";

const RightSide = () => {
    const [settingModalOpend, setSettingModalOpened] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
        <div className="RightSide">
            <div className="navIcons">
                <Link style={{ color: "inherit" }} to="../home">
                    <ImHome size={33} className="icon" />
                </Link>
                <AiFillSetting size={33} className="icon" onClick={() => setSettingModalOpened(true)} />
                <Link style={{ color: "inherit" }} to={`/profile/${user._id}`}>
                    <IoPersonCircle size={34} className="icon" />
                </Link>
                <IoNotificationsCircle size={33} className="icon" onClick={() => setNotificationModal(true)} />
                <Link style={{ color: "inherit" }} to="../chat">
                    <RiChat1Fill size={32} className="icon" />
                </Link>
            </div>
            <FollowersCard />
            {<SettingsModal settingModalOpend={settingModalOpend} setSettingModalOpened={setSettingModalOpened} />}
            {<NotificationModal notificationModal={notificationModal} setNotificationModal={setNotificationModal} />}
        </div>
    );
};

export default RightSide;
