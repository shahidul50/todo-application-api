import express from 'express';
const router = express.Router()
import {getAllTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
import protect from '../middlewares/authMiddleware.js'

router.get('/', protect, getAllTodos )
router.post('/',protect, addTodo )
router.route('/:id').put(protect,updateTodo).delete(protect,deleteTodo)

export default router