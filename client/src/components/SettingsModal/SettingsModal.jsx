import { Modal } from "@mantine/core";
import { useState } from "react";
import "../ReportPostModal/ReportPostModal.css";
import { useSelector } from "react-redux";
import { message } from "antd";
import { updatePassword } from "../../api/AuthRequests";

function SettingsModal({ settingModalOpend, setSettingModalOpened }) {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [formData, setFormData] = useState("");
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.oldpassword || !formData.newpassword || !formData.newconfirmpass) {
            return message.error("oops! fields are empty");
        }
        if (formData.newpassword !== formData.newconfirmpass) {
            return message.error("Conform password did not match!");
        }
        if (formData.newpassword.length < 5) {
            return message.error("Password minimum length is 5");
        }
        const id = user._id;
        await updatePassword(id, formData)
            .then((response) => {
                if (response.status === 200) message.success("Password Updated successfully");
                setSettingModalOpened(false);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    message.error("Old password is incorrect!");
                }
            });
    };

    return (
        <Modal
            opened={settingModalOpend}
            centered={true}
            withCloseButton={false}
            onClose={() => setSettingModalOpened(false)}
        >
            <div className="fieldsetStyleItems" style={{ textAlign: "center" }}>
                <span>Want to change Password?</span>

                <div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="Input"
                            style={{ width: "100", marginTop: "10px" }}
                            name="oldpassword"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="Input"
                            style={{ width: "100", marginTop: "10px" }}
                            name="newpassword"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="Input"
                            style={{ width: "100", marginTop: "10px" }}
                            name="newconfirmpass"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button
                    className="myButton"
                    style={{ marginTop: "10px", marginLeft: "5px", cursor: "pointer" }}
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </div>
        </Modal>
    );
}

export default SettingsModal;
