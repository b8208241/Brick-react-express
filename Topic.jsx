import React from 'react';

export default class TopicPage extends React.Component {
  render() {
    return(
      <section>
          <Row id="rowOne" rowRecord = {this.props.rowRecordOne}/>
          <Row id="rowTwo" rowRecord = {this.props.rowRecordTwo}/>
          <Row id="rowThree" rowRecord = {this.props.rowRecordThree}/>
          <Row id="rowFour" rowRecord = {this.props.rowRecordFour}/>
          <CreateBrick/>
      </section>
    );
  }
}

class Row extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rowCode : this.props.rowRecord
    }
    this.loadRow = this.loadRow.bind(this);
  };

  loadRow(){
    return {__html: this.state.rowCode};
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
