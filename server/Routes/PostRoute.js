import express from "express";
import { createPost, deletePost, editPost, getPost, getReportedPosts, getTimelinePosts, likePost, reportedPostRemove, reportPost } from "../Controllers/PostController.js";
// import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router()

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