import React from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import './index.css';
import App from './App';

// use localStorage to store notes
// or if first time use default note
const DATA = localStorage.DATA ? JSON.parse(localStorage.DATA) : [{
  id: nanoid(), 
  title: "My first note", 
  text: "Press the edit button to change the note title, note content and heading colour.",
  headingColour: "#ecf0f1"
}];

ReactDOM.render(
  <React.StrictMode>
    <App notes={DATA}/>
  </React.StrictMode>,
  document.getElementById('root')
);
