import express from "express";
import { addMessage, getMessages } from "../Controllers/MessageController.js";
// import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router()

router.post('/', addMessage)
router.get('/:chatId', getMessages)

export default router