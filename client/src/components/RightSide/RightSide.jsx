import React, { useState } from "react";
import "./RightSide.css";
import { ImHome } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import {IoPersonCircle} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowersCard from "../FollowersCard/FollowersCard";
import SettingsModal from "../SettingsModal/SettingsModal";

const RightSide = () => {
  const [settingModalOpend, setSettingModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link style={{color:"inherit"}} to="../home"><ImHome size={33} className="icon" /></Link>
        <AiFillSetting size={33} className="icon" onClick={()=>setSettingModalOpened(true)} />
        <Link style={{color:"inherit"}} to={`/profile/${user._id}`}><IoPersonCircle size={34} className="icon" /></Link>
        <Link style={{color:"inherit"}} to='../chat'>
        <FaRegCommentDots size={33} className="icon" />
        </Link>
      </div>
      <FollowersCard />
      {
                <SettingsModal
                    settingModalOpend={settingModalOpend}
                    setSettingModalOpened={setSettingModalOpened}
                />
            }
    </div>
  );
};

export default RightSide;
