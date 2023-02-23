import { Modal } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reportPost } from "../../actions/postAction";
import toast from "react-hot-toast";
import "./ReportPostModal.css";

function ReportPostModal({ reportPostModalOpen, setReportPostModalOpen, userId, postId }) {
    const [value, setValue] = useState(null);
    const dispatch = useDispatch();
    const reportThisPost = async () => {
        if (!value) {
            return toast.error("Select one of the Reason below");
        }
        const reportData = {
            reportedUser: userId,
            reason: value,
        };
        setReportPostModalOpen(false);
        await dispatch(reportPost(postId, reportData));
    };
    return (
        <Modal
            opened={reportPostModalOpen}
            centered={true}
            withCloseButton={false}
            onClose={() => setReportPostModalOpen(false)}
        >
            <fieldset>
                <legend style={{ color: "rgb(0,0,0)" }}>Please select the reason for reporting</legend>
                <div
                    className="fieldsetStyle"
                    onChange={(e) => {
                        console.log(e.target.value, "e.target value");
                        setValue(e.target.value);
                    }}
                >
                    <div className="fieldsetStyleItems">
                        <input type="radio" id="contactChoice1" name="contact" value="inappropriate" />
                        <label for="contactChoice1">inappropriate</label>
                    </div>
                    <div className="fieldsetStyleItems">
                        <input type="radio" id="contactChoice2" name="contact" value="violence" />
                        <label for="contactChoice2">violence</label>
                    </div>
                    <div className="fieldsetStyleItems">
                        <input type="radio" id="contactChoice3" name="contact" value="other" />
                        <label for="contactChoice3">other</label>
                    </div>
                </div>
                <div style={{ alignSelf: "flex-end" }}>
                    <button onClick={reportThisPost} className="myButton" type="button">
                        Submit
                    </button>
                </div>
            </fieldset>
        </Modal>
    );
}

export default ReportPostModal;
