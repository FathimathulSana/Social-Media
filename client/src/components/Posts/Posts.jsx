import React from "react";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { useEffect } from "react";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router";

const Posts = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    let { posts, loading } = useSelector((state) => state.postReducer);

    posts = posts.filter((post) => post.removed === false)

    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
    }, []);
    if (!posts) return "No posts";
    if (params.id) posts = posts.filter((post) => post.userId === params.id);
    return (
        <div className="Posts">
            {loading
                ? "Fetching Posts.."
                : posts.map((post, id) => {
                      return <Post data={post} id={id} />;
                  })}
        </div>
    );
};

export default Posts;
