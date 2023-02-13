import React from "react";
import "./Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "../../api/PostRequest";
import { editPost, getUser } from "../../api/UserRequest";
import Comment from "../Comment/Comment";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import ReportPostModal from "../ReportPostModal/ReportPostModal";
import Img from "../../img/reportPost.png";
import deletButton from "../../img/deleteButton.png";
import PostDeleteModal from "../PostDeleteModal/PostDeleteModal";

const Post = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length);
    const [owner, setOwner] = useState(null);
    const [edit, setEdit] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [reportPostModalOpen, setReportPostModalOpen] = useState(false);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const serverVideos = process.env.REACT_APP_PUBLIC_VIDEOS;
   console.log(serverVideos,"videos indo")


    // const editSubmit = async() => {
    //     //here in order to reduce the no. of states i have actually used the same state reportText
    //     const data = {postId : id,description : reportText}
    //     const datas = await editPost(id,data)
    //     dispatch({type : "EDIT_POST" , datas})
    //     setReportText("")
    //     setEdit(false)
    // }


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
                        <img className="PostImage"
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
                    <img src={Img} alt="" onClick={reportPostFn} style={{ width: "25px",height:"25px", cursor: "pointer" }} />
                )}
                {data.userId === user._id && (
                
                    <img
                        src={deletButton}
                        onClick={() => setModalOpen((prev) => !prev)}
                        style={{ width: "25px", height: "25px",cursor:"pointer"}}
                        alt=""
                    />
                   
               
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

            
        {    <PostDeleteModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    id={data._id}
                    currentUser={user._id}
                />
                }

            
            {/* <Modal
              opened={edit}
              onClose={() => setEdit(false)} >
                       <div style={{ textAlign: "center" }}>
                    <span>Edit the Description of your Post</span>

                    <input className="Input"
                        type="text"
                        style={{ width: "100", marginTop: "10px" }}
                        onChange={(e) => {
                            setReportText(e.target.value);
                        }}
                        id="report"
                        name="report"
                    />
                    <button className="button-delete" style={{ marginTop: "10px",marginLeft:"5px" }} onClick={editSubmit}>
                        Submit
                    </button>
                </div>

            </Modal>

         
                {user._id === data?.userId ? <div>
                    <div onClick={() =>{
                        setEdit(true)
                    }}><AiFillEdit /> Edit this Post</div>
                </div>
                 } */}
       

            {/* =================== */}

            <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
            <img src={data.image ? serverPublic + data.image : ""} alt="" />
            { data.video && <video style={{width:"100%"}} controls loop autoPlay={true} muted src={serverVideos + data.video } />}
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
