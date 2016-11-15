import React from 'react';
import ReactDOM from 'react-dom';
import TopicPage from '../views/topic_Wall.jsx';

let serverRenderRow = document.getElementById('rowOne').innerHTML;
ReactDOM.render(<TopicPage rowRecord = {serverRenderRow}/>, document.getElementById("app"));

