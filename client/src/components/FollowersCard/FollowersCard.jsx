import React from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";

const FollowersCard = ({ locality }) => {
    const dispatch = useDispatch();
    const [followerPersons, setFollowersPersons] = useState([]);
    const [followingPersons, setFollowingPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);
    const  person  = useSelector((state) => state.userReducer.userData);
    const [persons,setPersons] = useState([])

    useEffect(() => {
            setFollowersPersons(persons?.filter((person) => user.followers.includes(person._id)));
            setFollowingPersons(persons?.filter((person) => user.following.includes(person._id)));
      
    }, [persons]);

    useEffect(() => {
        const fetchPersons = async () => {
          const { data } = await getAllUser();
          setPersons(data);
        };
        fetchPersons();
      }, []);

    return (
        <>
            {locality === "profileSide" ? (
                <div className="FollowerCard">
                    <h3>People you may know</h3>
                    {persons ? (
                        <>
                            {persons.map((person, id) => {
                                if (person._id !== user._id) {
                                    return <User person={person} list="people" key={id} id={person._id} />;
                                }
                            })}
                        </>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <div className="FollowerCard">
                    {followerPersons.length > 0 ? <h3>Followers</h3> : ""}

                    {followerPersons.map((person, id) => {
                        if (person._id !== user._id) {
                            return <User person={person} list="followerspeople" key={id} id={person._id} />;
                        }
                    })}
                    <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
                    {followingPersons.length > 0 ? <h3>Following</h3> : ""}

                    {followingPersons.map((person, id) => {
                        if (person._id !== user._id) {
                            return <User person={person} list="followingpeople" key={id} id={person._id}/>;
                        }
                    })}
                </div>
            )}
        </>
    );
};

export default FollowersCard;