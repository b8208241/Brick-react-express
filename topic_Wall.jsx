import React from 'react';
import dataSubmit from '../js/opp_submit.js';

export default class TopicPage extends React.Component {
  render() {
    return(
      <section>
          <CreateBrick/>
          <Row id="rowOne" rowRecord = {this.props.rowRecordOne}/>
      </section>
    );
  }
}

class Row extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rowHtml : this.props.rowRecord.row.rowOne
    }
    this.loadRow = this.loadRow.bind(this);
  };

  loadRow(){
    return {__html: this.state.rowHtml};
  }

  render() {
    return (
      <div className="row" id={this.props.id} dangerouslySetInnerHTML={this.loadRow()} />
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
