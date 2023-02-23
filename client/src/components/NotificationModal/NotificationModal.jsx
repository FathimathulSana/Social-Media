import { Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import "../ReportPostModal/ReportPostModal.css";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordion from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../actions/userAction";
import { removeNotification } from "../../api/UserRequest";
import { useNavigate } from "react-router";
const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function NotificationModal({ notificationModal, setNotificationModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(0);
    const [allNotifications, setAllNotifications] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchNotifications = async () => {
            const Notifications = await dispatch(getNotifications(user._id));
            setAllNotifications(Notifications.data);
        };
        fetchNotifications();
    }, [notificationModal, allNotifications]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleNotificationClick = async (id) => {
        await removeNotification(id);
    };
    return (
        <Modal
            opened={notificationModal}
            centered={true}
            withCloseButton={false}
            onClose={() => setNotificationModal(false)}
        >
            <div className="fieldsetStyleItems" style={{ textAlign: "center" }}>
                <span>
                    <strong>Notifications</strong>
                </span>
                {allNotifications.length > 0 ? (
                    allNotifications.map((notification, index) => (
                        <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>You got a new follower</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate(`/profile/${notification.senderId}`);
                                        }}
                                    >
                                        {" "}
                                        {notification.message}
                                    </span>
                                    <button
                                        className="myButton"
                                        onClick={() => {
                                            handleNotificationClick(notification._id);
                                        }}
                                    >
                                        x
                                    </button>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <p>No new Followers</p>
                )}
            </div>
        </Modal>
    );
}

export default NotificationModal;
