import express from "express";
import { createComment, deleteComment, editComment, getComments } from '../Controllers/CommentController.js';
import authMiddleWare from "../MiddleWare/authMiddleWare.js";



const router = express.Router();


router.post('/:id',authMiddleWare, createComment)
router.get('/:id',authMiddleWare, getComments)
router.delete('/:commentId',authMiddleWare,deleteComment)
router.post('/edit/comment',authMiddleWare,editComment)

export default router;
