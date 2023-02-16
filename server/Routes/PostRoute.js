import express from "express";
import { createPost, deletePost, editPost, getPost, getReportedPosts, getTimelinePosts, likePost, reportedPostRemove, reportPost } from "../Controllers/PostController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router()

router.post('/',authMiddleWare, createPost)
router.get('/:id',authMiddleWare, getPost)
router.post('/:id/delete',authMiddleWare, deletePost)
router.put('/:id/like',authMiddleWare, likePost)
router.get('/:id/timeline',authMiddleWare, getTimelinePosts)
router.post('/report/:id',authMiddleWare, reportPost)
router.post('/edit/post',authMiddleWare, editPost)
router.post('/getreportedposts',authMiddleWare, getReportedPosts)
router.post('/reportedpostremove/:id',authMiddleWare, reportedPostRemove)

export default router;