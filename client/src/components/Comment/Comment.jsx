import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { TiDelete } from "react-icons/ti";
import { TiEdit } from "react-icons/ti";
import "./Comment.css";
import { createComment, deleteComment, getComments } from "../../actions/CommentAction";
import CommentEditModal from "../CommentEditModal/CommentEditModal";

const Comment = ({ data }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commentEditModal, setCommentEditModal] = useState(false);

    useEffect(() => {
        try {
            const fetchComments = async () => {
                const response = await dispatch(getComments(data._id));
                setComments(response.data);
            };
            fetchComments();
        } catch (error) {
            console.log(error);
        }
    }, [comments]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (comment.length === 0 || comment.indexOf(" ") === 0) {
                return toast("Write Something", {
                    icon: "🫤",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            } else {
                const response = await dispatch(createComment(data._id, comment, user._id));

                setComments((pre) => {
                    return [...pre, response.data];
                });
                setComment("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (comment) => {
        const commentId = comment._id;
        dispatch(deleteComment(commentId));
    };
    return (
        <>
            <div className="commentdata">
                {comments.map((value, index) => {
                    return (
                        <>
                            <p>
                                <b>
                                    {value.userId?.firstname} {value.userId?.lastname}
                                </b>
                                :{value?.comment}
                                {value.userId._id === user._id ? (
                                    <TiDelete
                                        size={20}
                                        color={"#ae056d"}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDelete(value)}
                                    />
                                ) : (
                                    ""
                                )}
                                {value.userId._id === user._id ? (
                                    <TiEdit
                                        size={20}
                                        color={"#ae056d"}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setCommentEditModal((prev) => !prev)}
                                    />
                                ) : (
                                    ""
                                )}
                            </p>
                            {
                                <CommentEditModal
                                    commentEditModal={commentEditModal}
                                    setCommentEditModal={setCommentEditModal}
                                    userId={user._id}
                                    commentId={value._id}
                                />
                            }
                        </>
                    );
                })}
            </div>
            <div className="comment">
                <form action="" onSubmit={handleSubmit}>
                    <input
                        className="writeComment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        placeholder="Write Your Comments Here"
                        style={{ color: "var(--phone)" }}
                    ></input>

                    <button className="button commentButton" type="submit">
                        Post
                    </button>
                </form>
            </div>
        </>
    );
};

export default Comment;
