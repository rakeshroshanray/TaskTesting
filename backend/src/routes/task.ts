import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { getTaskStatistics } from '../controllers/taskStatsController'; 
import verifyToken from '../middlewares/auth'; 

const router = express.Router();


router.get('/tasks', verifyToken, getTasks);
router.post('/tasks', verifyToken, createTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);


router.get('/tasks/statistics', verifyToken, getTaskStatistics);

export default router;
