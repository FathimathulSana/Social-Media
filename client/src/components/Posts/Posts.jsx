import React, { useState } from "react";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { useEffect } from "react";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router";
import NoPost from "../NoPost/NoPost";
import FadeLoader from "react-spinners/FadeLoader";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";

const override = {
    display: "block",
    margin: "0 auto",
};

const Posts = () => {
    const [refresh, setRefresh] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    let { posts, loading } = useSelector((state) => state.postReducer);

    posts = posts.filter((post) => post.removed === false);

    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
    }, [refresh]);
    if (params.id) posts = posts.filter((post) => post.userId === params.id);
    return (
        <div className="Posts">
            {loading ? (
                <FadeLoader color="black" cssOverride={override} loading={loading} />
            ) : (
                posts.map((post, id) => {
                    return <Post refresh={refresh} setRefresh={setRefresh} data={post} id={id} />;
                })
            )}
            {posts.length === 0 && !loading && <NoPost />}
            {posts.length > 0 && !loading && <AllCaughtUp />}
        </div>
    );
};

export default Posts;
