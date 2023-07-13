import React from 'react';
import './ContestPage.css'; // Import CSS styles

const Contests = () => {
  // Declare mock data for the contest and leaderboard
  const contest = {
    name: 'CodeWar 2022',
    startDate: 'January 1, 2022',
    endDate: 'January 31, 2022',
    rules: 'This is a mock coding contest. The rules go here.',
    prizes: 'First place: $1000, Second place: $500, Third place: $250',
  };
  const leaderboardData = [
    { id: 1, name: 'Alice', score: 100 },
    { id: 2, name: 'Bob', score: 90 },
    { id: 3, name: 'Charlie', score: 80 },
    { id: 4, name: 'Dave', score: 70 },
  ];

  return (
    <div className="contest-page">
      <h1>{contest.name}</h1>
      <p>Start Date: {contest.startDate}</p>
      <p>End Date: {contest.endDate}</p>
      <h2>Rules</h2>
      <p>{contest.rules}</p>
      <h2>Prizes</h2>
      <p>{contest.prizes}</p>
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contests;
