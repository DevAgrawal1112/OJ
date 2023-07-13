import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [submitTime, setSubmitTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language: 'cpp',
      code,
      input
    };

    try {
      const { data } = await axios.post('http://localhost:8080/run', payload);
      console.log(data);
      if (data.output) {
        setOutput(data.output);
        setError('');
      } else if (data.error) {
        setError(data.error);
        setOutput('');
      }
      setSubmitTime(new Date().toLocaleString());
    } catch (error) {
      console.log(1);
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Online Code Compiler</h1>
      <div className="code-output">
        <div className="code-container">
          <textarea
            rows="10"
            cols="75"
            className="textareacode"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            placeholder="Enter your code here"
          ></textarea>
          <textarea
            rows="4"
            cols="75"
            className="textarea"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Enter input here"
          ></textarea>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          {submitTime && (
            <p className="submit-time">Submitted at: {submitTime}</p>
          )}
        </div>
        {output && (
          <div className="output-container">
            <h2>Output:</h2>
            <div className="outputbox">
              <p>{output}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="output-container">
            <h2>Error:</h2>
            <div className="outputbox error">
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
