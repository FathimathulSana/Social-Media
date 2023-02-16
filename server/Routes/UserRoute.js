import express from "express";
import { blockuser, deleteUser, followUser, getAllUsers, getUser, getUserData, getVerifyNotifications, isFamousRequest, makeIsFamous, unFollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
const router = express.Router();

router.use(authMiddleWare)
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unFollowUser)
router.post('/blockuser/:id', blockuser)
router.post('/getdata', getUserData)
router.post('/isfamousrequest/:id', isFamousRequest)
router.post('/getverifynotifications', getVerifyNotifications)
router.post('/makeisfamous/:id', makeIsFamous)

export default router;