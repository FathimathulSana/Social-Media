import { Modal } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import "../ReportPostModal/ReportPostModal.css";
import { editComment } from "../../actions/CommentAction";

function CommentEditModal({ commentEditModal, setCommentEditModal, userId, commentId }) {
    const [value, setValue] = useState(null);
    const dispatch = useDispatch();
    const editSubmit = async () => {
        if (!value) {
            return toast.error("Write your Comment");
        }
        const editData = {
            commentId: commentId,
            comment: value,
        };
        setCommentEditModal(false);
        dispatch(editComment(commentId, editData));
    };
    return (
        <Modal opened={commentEditModal} centered={true} withCloseButton={false} onClose={() => setCommentEditModal(false)}>
            <div className="fieldsetStyleItems" style={{ textAlign: "center" }}>
                <span>Edit Your Comment</span>

                <input
                    className="Input"
                    type="text"
                    style={{ width: "100", marginTop: "10px", marginLeft: "5px" }}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    id="report"
                    name="report"
                />
                <button
                    className="myButton"
                    style={{ marginTop: "10px", marginLeft: "8px", cursor: "pointer" }}
                    onClick={editSubmit}
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
}

export default CommentEditModal;
