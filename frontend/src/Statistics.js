// import React from "react";

// const Statistics = () => {
//   const stats = [
//     { label: "Total Tasks", value: 42 },
//     { label: "Completed Tasks", value: 28 },
//     { label: "Pending Tasks", value: 14 },
//     { label: "Average Priority", value: 2.5 },
//   ];

//   return (
//     <div className="p-6 bg-white rounded-lg shadow">
//       <h2 className="text-lg font-bold mb-4">Statistics</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center"
//           >
//             <p className="text-sm text-gray-500">{stat.label}</p>
//             <p className="text-2xl font-bold text-blue-500">{stat.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Statistics;
import React, { useEffect, useState } from 'react';
import { getStatistics } from './api';

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStatistics();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Statistics</h2>
      <p>Total Tasks: {stats.totalTasks}</p>
      <p>Completed Tasks: {stats.completedTasks}</p>
      <p>Pending Tasks: {stats.pendingTasks}</p>
      <p>Average Completion Time: {stats.averageCompletionTime.toFixed(2)} hours</p>
    </div>
  );
};

export default Statistics;
