import UserModel from "../Models/userModel.js";

export const viewAllUsers = async (req, res) => {
    try {
        const usersList = await UserModel.find({}, { username: 1, firstname: 1, lastname: 1, block: 1 }).lean();
        res.status(200).json({ usersList })
    } catch (error) {
        res.status(500).send(error)
    }
}