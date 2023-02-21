import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getReportedPosts } from "../../actions/postAction";
import { getVerifyNotifications } from "../../actions/userAction";
import { getAllUser } from "../../api/UserRequest";
import AdminNotifications from "../AdminNotifications/AdminNotifications";
import ReportedPosts from "../ReportedPosts/ReportedPosts";
import Table from "../Table/Table";
import "./MainDash.css";

const MainDash = ({ mainDashItem }) => {
    const dispatch = useDispatch();

    const [allVerifyNotifications, setAllVerifyNotifications] = useState([]);
    const [isFamousMadeTrue, setIsFamousMadeTrue] = useState(false);
    const [reportedPostsUseEffect, setReportedPostsUseEffect] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [userActive, setUserActive] = useState(false);
    const [allReportedPosts, setAllReportedPosts] = useState([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            const users = await getAllUser();
            setUsersData(users.data);
        };
        fetchUsersData();
    }, [userActive]);

    useEffect(() => {
        const fetchPostData = async () => {
            const Posts = await dispatch(getReportedPosts());
            setAllReportedPosts(Posts.data);
        };
        fetchPostData();
    }, [reportedPostsUseEffect]);
    useEffect(() => {
        const fetchVerifyNotifications = async () => {
            const VerifyNotifications = await dispatch(getVerifyNotifications());
            setAllVerifyNotifications(VerifyNotifications.data);
        };
        fetchVerifyNotifications();
    }, [mainDashItem, isFamousMadeTrue]);
    return (
        <div className="MainDash">
            {mainDashItem === 0 && (
                <div className="NotificationsAcordian">
                    <h3>Notifications</h3>
                    {allVerifyNotifications.length > 0 ? (
                        <AdminNotifications
                            allVerifyNotifications={allVerifyNotifications}
                            setIsFamousMadeTrue={setIsFamousMadeTrue}
                            reportedPostsUseEffect={reportedPostsUseEffect}
                        />
                    ) : (
                        <span>No new verification requests yet</span>
                    )}
                </div>
            )}
            {mainDashItem === 1 && (
                <div className="usersTable">
                    <h3>All users</h3>
                    <Table usersData={usersData} setUserActive={setUserActive} userActive={userActive} />
                </div>
            )}
            {mainDashItem === 2 && (
                <div className="reportedPostsTable">
                    <h3>Reported Posts</h3>
                    <ReportedPosts
                        allReportedPosts={allReportedPosts}
                        setReportedPostsUseEffect={setReportedPostsUseEffect}
                    />
                </div>
            )}
        </div>
    );
};

export default MainDash;
