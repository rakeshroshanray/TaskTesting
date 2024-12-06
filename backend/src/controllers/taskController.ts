import { Request, Response } from 'express';
import Task from '../models/Task';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { status, priority, sortByStartTime, sortByEndTime } = req.query;

    let filterQuery: any = { user: userId };

    if (status) {
      filterQuery.status = status; 
    }

    if (priority) {
      filterQuery.priority = priority;  
    }

    
    let sortOptions: any = {};

    if (sortByStartTime) {
      sortOptions.startTime = sortByStartTime === 'desc' ? -1 : 1;  
    }

    if (sortByEndTime) {
      sortOptions.endTime = sortByEndTime === 'desc' ? -1 : 1; 
    }

    const tasks = await Task.find(filterQuery).sort(sortOptions);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { title, description, status, startTime, endTime, priority } = req.body;

    console.log(userId, "User ID");
    const task = new Task({ user: userId, title, description, status, startTime, endTime, priority });

    console.log(task, "Task object before saving");
    await task.save();
    console.log("Task saved successfully");
    res.status(201).json(task);
  } catch (error) {
    console.error(error, "Error while saving task");
    res.status(400).json({ error: 'Failed to create task' });
  }
}
export const updateTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { status } = req.body;

    console.log("Task ID:", id);
    console.log("User ID:", userId);

    if (status === 'finished') {
      req.body.endTime = new Date(); 
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId }, 
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      console.log("No task found or unauthorized");
      res.status(404).json({ error: 'Task not found or unauthorized' });
      return;
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(400).json({ error: 'Failed to update task' });
  }
};



export const deleteTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id; 

    console.log("Task ID to delete:", id);
    console.log("User ID:", userId);

    
    const task = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!task) {
      console.log("No task found or unauthorized");
      res.status(404).json({ error: 'Task not found or unauthorized' });
      return;
    }

    console.log("Task deleted successfully");
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

