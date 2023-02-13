import express from "express";
import { createComment, deleteComment, getComments } from '../Controllers/CommentController.js';
import authMiddleWare from "../MiddleWare/authMiddleWare.js";



const router = express.Router();


router.post('/:id', createComment)
router.get('/:id', getComments)
router.delete('/:commentId',deleteComment)

export default router;
