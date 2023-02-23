import React from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser, getUserData } from "../../actions/userAction";

const LogoSearch = ({ setNewUser, place }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const setUser = (person) => {
        dispatch(getUser(person._id));
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await dispatch(getUserData(query));
            setData(data);
        };
        if (query.length >= 1) fetchData();
    }, [query]);
    return (
        <div className="LogoSearch dropdown">
            <img src={Logo} width="40%" alt="" />
            <div className="Search">
                <input type="text" placeholder="#Explore" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                <div className="s-icon">
                    <UilSearch />
                </div>
            </div>
            <div className="dropdown-content">
                {place === "chatPage"
                    ? data.map((person) => (
                          <>
                              <img
                                  className="LogoDp"
                                  src={
                                      person?.profilePicture
                                          ? serverPublic + person.profilePicture
                                          : serverPublic + "defaultProfile.jpg"
                                  }
                                  alt=""
                              />
                              <p onClick={() => setNewUser(person)} style={{ cursor: "pointer" }}>
                                  {person.username}
                              </p>
                              <hr style={{ marginTop: "15px", width: "100%", border: "0.1px solid #ececec" }} />
                          </>
                      ))
                    : data.map((person) => (
                          <>
                              <Link
                                  key={person._id}
                                  onClick={() => setUser(person)}
                                  style={{ textDecoration: "none", color: "inherit" }}
                                  to={`/profile/${person._id}`}
                              >
                                  <img
                                      className="LogoDp"
                                      src={
                                          person?.profilePicture
                                              ? serverPublic + person.profilePicture
                                              : serverPublic + "defaultProfile.jpg"
                                      }
                                      alt=""
                                  />
                                  {person.username}
                              </Link>
                              <hr style={{ marginTop: "15px", width: "100%", border: "0.1px solid #ececec" }} />
                          </>
                      ))}
            </div>
        </div>
    );
};

export default LogoSearch;
