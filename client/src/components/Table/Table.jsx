import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { blockUser } from "../../actions/userAction";

const makeStyles = (active) => {
    if (active) {
        return {
            background: "rgb(145 254 159/ 47%)",
            color: "green",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "4px",
        };
    } else {
        return {
            background: "#ffadad8f",
            color: "red",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "4px",
        };
    }
};

export default function BasicTable({ usersData, setUserActive }) {
    const dispatch = useDispatch();

    const changeStatus = async (id, active) => {
        const blockunblock = await dispatch(blockUser(id, active));
        setUserActive((prev) => !prev);
        toast.success(blockunblock.data);
    };

    let rowIndex = 0;
    return (
        <div className="Table">
            <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029", width: "90%" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">email</TableCell>
                            <TableCell align="left">status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                        {usersData.map((user) => (
                            <TableRow key={user._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {++rowIndex}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.firstname} {user.lastname}
                                </TableCell>
                                <TableCell align="left">{user.username}</TableCell>
                                <TableCell align="left">
                                    <span
                                        className="userStatus"
                                        onClick={() => changeStatus(user._id, user.active)}
                                        style={makeStyles(user.active)}
                                    >
                                        {user.active ? "active" : "Blocked"}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
