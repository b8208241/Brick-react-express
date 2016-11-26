import React from 'react';
import ReactDOM from 'react-dom';
import UserNow from '../views/Index.jsx';

  let arr = [];
  let topicBrick = document.getElementsByClassName('topic-Row-Brick');
  for (var i = 0; i < topicBrick.length; i++) {
    let obj = {};
    obj.id = document.getElementsByClassName('topic-Row-Brick')[i].getAttribute('id');
    obj.topic = document.getElementsByClassName('topic-Row-Brick')[i].innerHTML;
    obj.url = document.getElementsByClassName('topic-Row-Brick')[i].parentElement.getAttribute('href');
    arr.push(obj);
  };

ReactDOM.render(<UserNow topicSaved={arr}/>, document.getElementById("app"));
