import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal'; 

const TaskList = ({ tasks, fetchTasks }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('No authentication token found!');
        return;
      }

      await axios.delete(`http://localhost:5000/api/tatasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task!');
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowEditModal(true); 
  };

  const closeEditModal = () => {
    setShowEditModal(false); 
    setTaskToEdit(null);
  };

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">{task.priority}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <TaskModal
          task={taskToEdit}
          onClose={closeEditModal}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskList;
