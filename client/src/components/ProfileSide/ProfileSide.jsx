import React, { useEffect } from "react";
import "./ProfileSide.css";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import FollowersCard from "../FollowersCard/FollowersCard";

const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <ProfileCard location="homepage" />
            <FollowersCard locality="profileSide" />
        </div>
    );
};

export default ProfileSide;
