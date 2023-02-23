import { Modal } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { editPost } from "../../api/UserRequest";
import "../ReportPostModal/ReportPostModal.css";

function PostEditModal({ editModalOpen, setEditModalOpen, setRefresh, userId, postId }) {
    const [value, setValue] = useState(null);
    const dispatch = useDispatch();
    const editSubmit = async () => {
        if (!value) {
            return toast.error("Write Description");
        }
        const editData = {
            postId: postId,
            description: value,
        };
        setEditModalOpen(false);
        setRefresh((pre) => !pre);
        await dispatch(editPost(postId, editData));
    };
    return (
        <Modal opened={editModalOpen} centered={true} withCloseButton={false} onClose={() => setEditModalOpen(false)}>
            <div className="fieldsetStyleItems" style={{ textAlign: "center" }}>
                <span>Edit the Description of your Post</span>

                <input
                    className="Input"
                    type="text"
                    style={{ width: "100", marginTop: "10px" }}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    id="report"
                    name="report"
                />
                <button
                    className="myButton"
                    style={{ marginTop: "10px", marginLeft: "5px", cursor: "pointer" }}
                    onClick={editSubmit}
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
}

export default PostEditModal;
