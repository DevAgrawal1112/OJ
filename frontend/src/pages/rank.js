import React, { useState } from 'react';

const Rank= () => {
  // Declare a state variable for the leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([    { id: 1, name: 'Alice', score: 100 },    { id: 2, name: 'Bob', score: 90 },    { id: 3, name: 'Charlie', score: 80 },    { id: 4, name: 'Dave', score: 70 },  ]);

  // Function to sort the leaderboard data by score
  const sortLeaderboard = () => {
    const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
    setLeaderboardData(sortedData);
  };

  return (
    <div>
      <button onClick={sortLeaderboard}>Sort Leaderboard</button>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: '#eee', fontWeight: 'bold' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={player.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rank;
