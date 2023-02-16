import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userAction";
import Bluetick from "../../img/tick.png";

const User = ({ person, list, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const handleFollow = () => {
        following ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user));

        setFollowing((prev) => !prev);
    };

    useEffect(() => {
        const followingStatus = () => {
            user.following.includes(person._id) || list === "followingPeople" ? setFollowing(true) : setFollowing(false);
        };
        followingStatus();
    }, [user]);

    return (
        <div className="follower" id={id}>
            <div
                onClick={() => {
                    navigate(`/profile/${person._id}`);
                }}
            >
                <img
                    src={person.coverPicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.jpg"}
                    alt=""
                    className="followerImg"
                />
                <div className="name">
                    <span>
                        {person.firstname} {person.lastname}
                        <span>
                            {person?.isFamous === "true" ? <img className="verifiedBlueTick" src={Bluetick} alt="" /> : ""}
                        </span>
                    </span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button
                className={user.following.includes(person._id) ? "button fc-button UnfollowButton" : "button fc-button"}
                onClick={handleFollow}
            >
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
};

export default User;
