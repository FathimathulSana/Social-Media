import express from 'express'
import { createChat, findChat, userChats } from '../Controllers/ChatController.js'
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
const router = express.Router()

router.use(authMiddleWare)
router.post('/',createChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secondId', findChat)

export default router