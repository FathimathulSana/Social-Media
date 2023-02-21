import express from "express";
import { getReportedPosts, reportedPostRemove } from "../Controllers/AdminController.js";
import { createPost, deletePost, editPost, getPost, getTimelinePosts, likePost, reportPost } from "../Controllers/PostController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
const router = express.Router()

router.use(authMiddleWare)
router.post('/', createPost)
router.get('/:id', getPost)
router.post('/:id/delete', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/report/:id', reportPost)
router.post('/edit/post', editPost)
router.post('/getreportedposts', getReportedPosts)
router.post('/reportedpostremove/:id', reportedPostRemove)

export default router;