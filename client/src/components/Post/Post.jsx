import React from "react";
import "./Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "../../api/PostRequest";
import { getUser } from "../../api/UserRequest";
import Comment from "../Comment/Comment";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import ReportPostModal from "../ReportPostModal/ReportPostModal";
import Img from "../../img/reportPost.png";
import deletButton from "../../img/deleteButton.png";
import PostDeleteModal from "../PostDeleteModal/PostDeleteModal";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { Dropdown } from "antd";
import PostEditModal from "../PostEditModal/PostEditModal";

const Post = ({ data, refresh, setRefresh }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length);
    const [owner, setOwner] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [reportPostModalOpen, setReportPostModalOpen] = useState(false);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const serverVideos = process.env.REACT_APP_PUBLIC_VIDEOS;

    useEffect(() => {
        const fetchUser = async () => {
            const owner = await getUser(data.userId);
            setOwner(owner.data);
        };
        fetchUser();
    }, [data]);

    const handleLike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    };
    const [show, setShow] = useState(false);

    const reportPostFn = () => {
        setReportPostModalOpen(true);
    };
    const items = [
        {
            key: "1",
            label: (
                <img
                    src={deletButton}
                    onClick={() => setModalOpen((prev) => !prev)}
                    style={{ marginTop: "18px", width: "25px", height: "25px", cursor: "pointer" }}
                    alt=""
                />
            ),
        },
        {
            key: "2",
            label: (
                <AiFillEdit
                    onClick={() => setEditModalOpen((prev) => !prev)}
                    style={{ marginTop: "18px", width: "25px", height: "25px", cursor: "pointer" }}
                />
            ),
        },
    ];

    return (
        <div className="Post">
            <div className="abovePostPic">
                <div className="Post-Info">
                    <div
                        className="postHeads"
                        onClick={() => {
                            navigate(`/profile/${owner._id}`);
                        }}
                    >
                        <img
                            className="PostImage"
                            src={
                                owner?.profilePicture
                                    ? serverPublic + owner.profilePicture
                                    : serverPublic + "defaultProfile.jpg"
                            }
                            alt=""
                        />
                        <b style={{ marginLeft: "5px", cursor: "pointer" }}>{owner?.username}</b>
                    </div>

                    {data.userId !== user._id && (
                        <img
                            src={Img}
                            alt=""
                            onClick={reportPostFn}
                            style={{ marginTop: "18px", width: "25px", height: "25px", cursor: "pointer" }}
                        />
                    )}
                    {data.userId === user._id && (
                        <div className="post-head-right">
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomRight"
                                arrow={{
                                    pointAtCenter: true,
                                }}
                            >
                                <button
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "none",
                                    }}
                                >
                                    <FiMoreVertical
                                        size={27}
                                        color={"black"}
                                        style={{ marginTop: "18px", cursor: "pointer" }}
                                    />
                                </button>
                            </Dropdown>
                        </div>
                    )}
                </div>
                <div className="postTime">Posted {format(data.createdAt)}</div>
            </div>
            {
                <ReportPostModal
                    reportPostModalOpen={reportPostModalOpen}
                    setReportPostModalOpen={setReportPostModalOpen}
                    userId={user._id}
                    postId={data._id}
                />
            }

            {<PostDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={data._id} currentUser={user._id} />}
            {
                <PostEditModal
                    setRefresh={setRefresh}
                    editModalOpen={editModalOpen}
                    setEditModalOpen={setEditModalOpen}
                    userId={user._id}
                    postId={data._id}
                />
            }

            <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
            <img src={data.image ? serverPublic + data.image : ""} alt="" />
            {data.video && (
                <video style={{ width: "100%" }} controls loop autoPlay={true} muted src={serverVideos + data.video} />
            )}
            <div className="detail">
                <span style={{ fontWeight: "bold", fontFamily: "cursive" }}> {data.description}</span>
            </div>
            <br />
            <div className="postReact" style={{ cursor: "pointer" }}>
                <div onClick={handleLike}>
                    {liked ? <AiFillHeart size={35} color={"red"} /> : <AiOutlineHeart size={35} />}
                </div>
                <FaRegCommentDots size={33} onClick={() => setShow((show) => !show)} />
            </div>
            <span style={{ color: "var(--gray)", fontSize: "13px" }}>{likes} likes</span>

            {show && (
                <div>
                    <Comment data={data} />
                </div>
            )}
        </div>
    );
};

export default Post;
