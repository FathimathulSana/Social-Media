import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ReportedPosts.css";
import { CgBlock, CgUnblock } from "react-icons/cg";
import { reportedPostRemove } from "../../actions/postAction";
import { useDispatch } from "react-redux";

export default function BasicTable({ allReportedPosts, setReportedPostsUseEffect }) {
    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const serverVideos = process.env.REACT_APP_PUBLIC_VIDEOS;

    const handlePostRemove = async (postId) => {
        const response = await dispatch(reportedPostRemove(postId));
        setReportedPostsUseEffect((prev) => !prev);
    };
    let rowIndex = 0;
    return (
        <div className="ReportedPosts">
            <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029", width: "80%" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Post</TableCell>
                            <TableCell align="left">Number of Reports</TableCell>
                            <TableCell align="left">Reports</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                        {allReportedPosts.map((post) => (
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {++rowIndex}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {post.image ? (
                                        <a href={serverPublic + post.image} target="_blank" rel="noreferrer">
                                            <img style={{ width: "60px" }} src={serverPublic + post.image} />
                                        </a>
                                    ) : (
                                        post.description
                                    )}
                                    <br />
                                    {post.video ? (
                                        <a
                                            href={serverVideos + post.video}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ color: "transparent" }}
                                        >
                                            <span style={{ cursor: "pointer", color: "black" }}>
                                                Reported video(Click here)
                                            </span>
                                        </a>
                                    ) : (
                                        ""
                                    )}
                                </TableCell>

                                <TableCell>{post.reports.length}</TableCell>

                                <TableCell align="left">
                                    {post.reports.map((report, index) => (
                                        <>
                                            {index >= 1 && <hr />}
                                            <span>{report.reason}</span>
                                        </>
                                    ))}
                                </TableCell>
                                <TableCell align="left">
                                    {!post.removed ? (
                                        <span onClick={() => handlePostRemove(post._id)} style={{ cursor: "pointer" }}>
                                            Block
                                            <CgBlock size={25} style={{ marginBottom: "-7px" }} />
                                        </span>
                                    ) : (
                                        <span onClick={() => handlePostRemove(post._id)} style={{ cursor: "pointer" }}>
                                            unBlock
                                            <CgUnblock size={25} style={{ marginBottom: "-7px" }} />{" "}
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
