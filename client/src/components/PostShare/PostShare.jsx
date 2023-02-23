import React, { useState, useRef } from "react";
import { UilScenery, UilPlayCircle, UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { uploadImage, uploadVideo } from "../../actions/uploadAction";
import { uploadPost } from "../../actions/uploadAction";
import "./PostShare.css";

const PostShare = () => {
    const loading = useSelector((state) => state.postReducer.uploading);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const imageRef = useRef();
    const videoRef = useRef();
    const dispatch = useDispatch();
    const description = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const onVideoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let newVideo = event.target.files[0];
            setVideo(newVideo);
        }
    };

    const reset = () => {
        setImage(null);
        setVideo(null);
        description.current.value = "";
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description.current?.value && !image) {
            return toast("oops! Fields are empty", {
                icon: "🫤",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }

        const newPost = {
            userId: user._id,
            description: description.current.value,
        };

        if (image) {
            if (
                !(
                    image.type === "image/jpeg" ||
                    image.type === "image/png" ||
                    image.type === "image/webp" ||
                    image.type === "image/jpg"
                )
            ) {
                return toast("oops! only support jpeg,png,jpg and webp", {
                    icon: "🙄",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            }

            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            newPost.image = filename;
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
            dispatch(uploadPost(newPost));
            reset();
        } else if (video) {
            if (!(video.type === "video/mp4")) {
                return toast("oops! only support mp4", {
                    icon: "🙄",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            }
            const data = new FormData();
            const filename = Date.now() + video.name.replaceAll(" ", "");
            data.append("name", filename);
            data.append("file", video);
            newPost.video = filename;
            try {
                dispatch(uploadVideo(data));
            } catch (error) {
                console.log(error);
            }
            dispatch(uploadPost(newPost));
            reset();
        } else {
            dispatch(uploadPost(newPost));
            reset();
        }
    };

    return (
        <div className="PostShare">
            <img
                src={user.coverPicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"}
                alt=""
            />
            <div>
                <input ref={description} required type="text" placeholder="What's happening" />
                <div className="PostOptions">
                    <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        <span className="icons-name">Photo</span>
                    </div>
                    <div className="option" style={{ color: "var(--video)" }} onClick={() => videoRef.current.click()}>
                        <UilPlayCircle />
                        <span className="icons-name">Video </span>
                    </div>
                    <button className="button ps-button" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Uploading.." : "POST"}
                    </button>
                    <div style={{ display: "none" }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                        <input type="file" name="myVideo" accept="video/*" ref={videoRef} onChange={onVideoChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes
                            onClick={() => {
                                setImage(null);
                                imageRef.current.value = null;
                            }}
                        />

                        {image && <img src={URL.createObjectURL(image)} alt="" />}
                    </div>
                )}
                {video && (
                    <div className="previewVdo">
                        <UilTimes
                            onClick={() => {
                                setVideo(null);
                                videoRef.current.value = null;
                            }}
                        />
                        {video && (
                            <video controls>
                                <source src={URL.createObjectURL(video)} />
                            </video>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
