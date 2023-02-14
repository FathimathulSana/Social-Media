import express from "express";
import { createComment, deleteComment, editComment, getComments } from '../Controllers/CommentController.js';
import authMiddleWare from "../MiddleWare/authMiddleWare.js";



const router = express.Router();


router.post('/:id', createComment)
router.get('/:id', getComments)
router.delete('/:commentId',deleteComment)
router.post('/edit/comment',editComment)

export default router;
