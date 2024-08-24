import express from 'express'
import { registerUser, authUser, getUserProfile, updateUserProfile, getUsers, deleteUser } from '../controllers/userController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser)

export default router