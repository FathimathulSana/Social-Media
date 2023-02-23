import React from "react";
import "./Chat.css";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../components/Conversation/Conversation";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { AiFillSetting } from "react-icons/ai";
import { IoNotificationsCircle } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { RiChat1Fill } from "react-icons/ri";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import SettingsModal from "../../components/SettingsModal/SettingsModal";

const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData);

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const [notificationModal, setNotificationModal] = useState(false);
    const [settingModalOpend, setSettingModalOpened] = useState(false);

    const socket = useRef();

    //send message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    //receive message from socket server
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceiveMessage(data);
        });
    }, []);

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user]);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    return (
        <div className="Chat">
            {/* left side */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="Right-side-chat">
                <div style={{ width: "24rem", alignSelf: "flex-end" }}>
                    <div style={{ marginBottom: "10px" }} className="navIcons-chat">
                        <Link style={{ color: "inherit" }} to="../home">
                            <ImHome size={33} className="icon" />
                        </Link>
                        <AiFillSetting size={33} className="icon" onClick={() => setSettingModalOpened(true)} />
                        <Link style={{ color: "inherit" }} to={`/profile/${user._id}`}>
                            <IoPersonCircle size={34} className="icon" />
                        </Link>
                        <IoNotificationsCircle size={33} className="icon" onClick={() => setNotificationModal(true)} />

                        <Link style={{ color: "inherit" }} to="../chat">
                            <RiChat1Fill size={32} className="icon" />
                        </Link>
                    </div>
                </div>

                {/* Chat body */}
                <ChatBox
                    chat={currentChat}
                    currentUser={user._id}
                    setSendMessage={setSendMessage}
                    receiveMessage={receiveMessage}
                />
            </div>
            {<NotificationModal notificationModal={notificationModal} setNotificationModal={setNotificationModal} />}
            {<SettingsModal settingModalOpend={settingModalOpend} setSettingModalOpened={setSettingModalOpened} />}
        </div>
    );
};

export default Chat;
