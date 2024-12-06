import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal'; 
import TaskList from './TaskList'; 

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false); 
  const [currentTask, setCurrentTask] = useState(null); 
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [priorityFilter, setPriorityFilter] = useState(''); 
  const [sortByStartTime, setSortByStartTime] = useState(''); 
  const [sortByEndTime, setSortByEndTime] = useState(''); 

  
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('No authentication token found!');
        return;
      }

     
      let queryParams = '';
      if (statusFilter && statusFilter !== 'all') {
        queryParams += `status=${statusFilter}&`;
      }

      if (priorityFilter) {
        queryParams += `priority=${priorityFilter}&`;
      }

      if (sortByStartTime) {
        queryParams += `sortByStartTime=${sortByStartTime}&`;
      }

      if (sortByEndTime) {
        queryParams += `sortByEndTime=${sortByEndTime}&`;
      }

      
      queryParams = queryParams.slice(0, -1);

      
      const response = await axios.get(`http://localhost:5000/api/tasks/tasks?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks!');
    }
  };

  
  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter, sortByStartTime, sortByEndTime]); 

  const handleTaskFormClose = () => {
    setShowTaskForm(false); 
    setCurrentTask(null); 
  };

  const handleShowTaskForm = (task = null) => {
    setCurrentTask(task); 
    setShowTaskForm(true); 
  };

  return (
    <div className="container mx-auto p-6">
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        
      </div>

      
      <div className="flex items-center mb-6 space-x-4">
        
        <div>
          <label htmlFor="sortByStartTime" className="mr-2">Sort by Start Time:</label>
          <select
            id="sortByStartTime"
            value={sortByStartTime}
            onChange={(e) => setSortByStartTime(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        
        <div>
          <label htmlFor="sortByEndTime" className="mr-2">Sort by End Time:</label>
          <select
            id="sortByEndTime"
            value={sortByEndTime}
            onChange={(e) => setSortByEndTime(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        
        <div>
          <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="finished">Finished</option>
          </select>
        </div>

        
        <div>
          <label htmlFor="priorityFilter" className="mr-2">Filter by Priority:</label>
          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

     
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Task List</h2>
        <button
          onClick={() => handleShowTaskForm()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        >
          Add New Task
        </button>
        <TaskList tasks={tasks} fetchTasks={fetchTasks} handleShowTaskForm={handleShowTaskForm} /> {/* Pass the function to edit tasks */}
      </div>

      
      {showTaskForm && (
        <TaskModal
          onClose={handleTaskFormClose}
          fetchTasks={fetchTasks}
          task={currentTask} 
        />
      )}
    </div>
  );
};

export default Home;
