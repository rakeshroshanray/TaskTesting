import { Request, Response } from 'express';
import Task from '../models/Task';


interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}


export const getTaskStatistics = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    
    const tasks = await Task.find({ user: userId });

   
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'finished').length; // Updated
    const pendingTasks = totalTasks - completedTasks;
    const completedPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const pendingPercent = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;

    let timeLapsedByPriority: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let balanceEstimatedTimeByPriority: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    tasks.forEach(task => {
      if (task.status === 'pending') {
        const currentTime = new Date().getTime();

        const timeLapsed = Math.max(currentTime - task.startTime.getTime(), 0);

        const balanceTime = Math.max(task.endTime.getTime() - currentTime, 0);

        timeLapsedByPriority[task.priority] += timeLapsed;
        balanceEstimatedTimeByPriority[task.priority] += balanceTime;
      }
    });

    const completedTasksWithTime = tasks.filter(task => task.status === 'finished'); // Updated
    const totalCompletionTime = completedTasksWithTime.reduce((acc, task) => {
      const completionTime = task.endTime.getTime() - task.startTime.getTime();
      return acc + completionTime;
    }, 0);
    const averageCompletionTime = completedTasksWithTime.length > 0
      ? totalCompletionTime / completedTasksWithTime.length
      : 0;

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completedPercent,
      pendingPercent,
      timeLapsedByPriority,
      balanceEstimatedTimeByPriority,
      averageCompletionTime: averageCompletionTime / (1000 * 60 * 60), // Convert to hours
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

