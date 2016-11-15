import React from 'react';
import dataSubmit from '../js/opp_submit.js';

export default class TopicPage extends React.Component {
  render() {
    return(
      <section>
          <PresentWall/>
          <CreateBrick/>
      </section>
    );
  }
}

class PresentWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  };

  render() {
    return(
      <div className="wall" id="presentWall">
          <PresentWallRow/>
      </div>
    )
  }
}

class PresentWallRow extends React.Component {
  render() {
    return (
      <div className="row" id = "row1" >
        <div className="placeholder" ></div>
        <div className="cell-default" ></div>
        <div className="placeholder" ></div>
        <div className="cell-default" ></div>
        <div className="placeholder" ></div>
        <div className="cell-default" ></div>
        <div className="placeholder" ></div>
      </div>
    )
  }
}

class CreateBrick extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(){
    $.colorbox.close();
  }

  render() {
    return(
      <div id="addBox" className="add-dialogbox">
		    <textarea className="add-input" id="main_text" ></textarea><br/>
		    <p id="ref"></p><br/>
		    <input type="submit" value="新增磚頭" onClick={this.handleSubmit}/>
	    </div>
    );
  }
}
