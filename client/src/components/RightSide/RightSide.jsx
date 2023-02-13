import React, { useState } from "react";
import "./RightSide.css";
import { ImHome } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import {IoPersonCircle} from "react-icons/io5";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowersCard from "../FollowersCard/FollowersCard";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link style={{color:"inherit"}} to="../home"><ImHome size={33} className="icon" /></Link>
        <AiFillSetting size={33} className="icon" />
        <Link style={{color:"inherit"}} to={`/profile/${user._id}`}><IoPersonCircle size={34} className="icon" /></Link>
        <Link style={{color:"inherit"}} to='../chat'>
        <FaRegCommentDots size={33} className="icon" />
        </Link>
      </div>
      <FollowersCard />
    </div>
  );
};

export default RightSide;
