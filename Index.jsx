import React from 'react';

export default class UserNow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topicSaved: this.props.topicSaved
    }
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  };

  handleNewSubmit(inputTopic){
    let state = this.state.topicSaved;
    let date = new Date();
    let time = date.getTime();
    let id = "topicBrick" + time;
    let url = "/topic.jsx?topic=topicBrick" + time;
    state.push({id: id, topic: inputTopic, url: url});
    this.setState({
      topicSaved: state
    });
    axios.post('/index/newtopic', {
      "id": id,
  		"topic": inputTopic,
      "url": url
    })
    .then(
      function(res){
        console.log(res.data);
      }
    );
  }

  render() {
    return(
      <section>
        <TopicRow topicSaved = {this.state.topicSaved}/>
        <NewTopicCreate handleNewSubmit={this.handleNewSubmit}/>
      </section>
    )
  }
}

class TopicRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topicSaved : this.props.topicSaved
    };
  };

  render() {
    let topicBrick = this.state.topicSaved.map(
      function(objData){
          return <TopicHistoryBrick key={objData.id} id={objData.id} topic={objData.topic} url={objData.url}/>;
      }
    );
    return(
      <ol className="topic-Row">
        {topicBrick}
      </ol>
    )
  }
}

class TopicHistoryBrick extends React.Component {
  render() {
    return(
      <a href={this.props.url}><li className="topic-Row-Brick" id={this.props.id}>{this.props.topic}</li></a>
    )
  }
}

class NewTopicCreate extends React.Component {
  constructor(props){
    super(props);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  }

  handleNewSubmit(){
    this.props.handleNewSubmit(this.inputTopic.value);
  }

  render() {
    return(
      <div className="topic-New">
      <input
        type="text"
        ref={(input) => this.inputTopic = input}
      />
      <input
        type="submit"
        value="新增"
        onClick={this.handleNewSubmit}
      />
      </div>
    )
  }
}
