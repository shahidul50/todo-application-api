import express from 'express';
const router = express.Router()
import {  registerUser, authUser,logoutUser,dashboard,getUserProfile, updateUserProfile} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js'

router.post('/', registerUser )
router.post('/login', authUser )
router.post('/logout', logoutUser )
router.get('/dashboard', protect , dashboard )
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router