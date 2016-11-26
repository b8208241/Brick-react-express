import React from 'react';
import ReactDOM from 'react-dom';
import TopicPage from '../views/Topic.jsx';

let serverRenderRowOne = document.getElementById('rowOne').innerHTML;
let serverRenderRowTwo = document.getElementById('rowTwo').innerHTML;
let serverRenderRowThree = document.getElementById('rowThree').innerHTML;
let serverRenderRowFour = document.getElementById('rowFour').innerHTML;
ReactDOM.render(<TopicPage rowRecordOne = {serverRenderRowOne} rowRecordTwo = {serverRenderRowTwo} rowRecordThree = {serverRenderRowThree} rowRecordFour = {serverRenderRowFour}/>, document.getElementById("app"));
