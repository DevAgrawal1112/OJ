import React from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Question from './question';
// function SearchBar() {
//   return (
//     <form>
//       <input type="text" placeholder="Search..." />
//     </form>
//   );
// }
const data = [
    { Number: 0, Title: "A+B Problem", Level: "LOW" },
    { Number: 1, Title: "A-B Problem", Level: "Medium" },
    { Number: 2, Title: "A*B Problem", Level: "Hard"},
  ]
const Problems = () => {
  return (
    <div>
    <h1 style={{display: 'flex',justifyContent: 'center',alignItems: 'top',height: '8vh'}}>
      Problem List
    </h1>
    {/* <SearchBar/> */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        height: '8vh',
        width: '100%'
      }}
    >
        <table style={{border: '2px solid forestgreen',width: '800px',height: '200px'}}>
        <tr>
          <th style={{borderBottom: '1px solid black'}}>Problem Number</th>
          <th style={{borderBottom: '1px solid black'}}>Title</th>
          <th style={{borderBottom: '1px solid black'}}>Level</th>
          <th style={{borderBottom: '1px solid black'}}>Total Submissions</th>
          <th style={{borderBottom: '1px solid black'}}>AC Rate</th>
          <th style={{borderBottom: '1px solid black'}}>Link</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td style={{textAlign: 'center'}}>{val.Number}</td>
              <td style={{textAlign: 'center'}}>{val.Title}</td>
              <td style={{textAlign: 'center'}}>{val.Level}</td>
              <td style={{textAlign: 'center'}}>{val.Submissions}</td>
              <td style={{textAlign: 'center'}}>{val.Rate}</td>
              <td style={{textAlign: 'center'}}>
                {val.Link}
              </td>
            </tr>
          )
        })}
      </table>
      </div>
      <Link to='/question' activeStyle>Go to page</Link>
    </div>
      
  );
}

export default Problems;
