import express from 'express'
import * as todoController from '../controller/todoController.js'
import { verifyToken } from '../middleware/auth.js'

const router=express.Router()

router.post("/todos",verifyToken,todoController.createTodo)
router.put("/todos/:id",verifyToken,todoController.updateTodo)
router.delete('/todos/:id',verifyToken,todoController.deleteTodo)
router.get("/todos",verifyToken,todoController.getTodo)

export default router