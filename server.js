var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require("path");
var jsonfile = require('jsonfile');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
  var DOM = React.DOM;
    var head = DOM.head;
    var body = DOM.body;
    var main = DOM.main;
    var section = DOM.section;
    var div = DOM.div;
    var script = DOM.script;
    var link = DOM.link;
var browserify = require('browserify');
var babelify = require("babelify");
require('babel/register')({
    ignore: false
});

var wallHistory = path.join(__dirname+'/data/wallHistory.json');
var topicFile = path.join(__dirname+'/data/topicHistory.json');

const server_Get =  {
  index: function(req, res){
    let Index = require('./views/Index.jsx');
    jsonfile.readFile(topicFile, function(err, data){
      if(err) {
        throw err;
      }else{
        var markup = ReactDOMServer.renderToString(React.createElement(Index, {topicSaved: data.topicSaved}));
        var htmlHead = ReactDOMServer.renderToStaticMarkup(
          head(
            null,
            script({src: "https://unpkg.com/axios/dist/axios.min.js"}),
            script({src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"}),
            script({src: "./opp_index.js", type: "text/javascript"}),
            link({href: "./colorbox.css", rel: "stylesheet"}),
            script({src: "./jquery.colorbox.js", type: "text/javascript"}),
            link({href: "./index.css", rel: "stylesheet"})
          )
        );
        var htmlBody = ReactDOMServer.renderToStaticMarkup(
          body(
            null,
            main({id: 'app', dangerouslySetInnerHTML: {__html: markup}}),
            script({src: '/bundle_index.js'})
          )
        );
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlHead + htmlBody);
      }
    });
  },
  topicPage: function(req, res){
    let TopicPage = require('./views/Topic.jsx');
    let askedTopic = req.query.topic;
    jsonfile.readFile(wallHistory, function(err, data){
      if(err) {
        throw err;
      }else{
        let askedTopicData = data[askedTopic];
        var markup = ReactDOMServer.renderToString(React.createElement(TopicPage, {rowRecordOne: askedTopicData.rowOne, rowRecordTwo: askedTopicData.rowTwo, rowRecordThree: askedTopicData.rowThree, rowRecordFour: askedTopicData.rowFour}));
        var htmlHead = ReactDOMServer.renderToStaticMarkup(
          head(
            null,
            script({src: "https://unpkg.com/axios/dist/axios.min.js"}),
            script({src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"}),
            script({src: "./opp_topic.js", type: "text/javascript"}),
            link({href: "./colorbox.css", rel: "stylesheet"}),
            script({src: "./jquery.colorbox.js", type: "text/javascript"}),
            link({href: "./brick.css", rel: "stylesheet"})
          )
        );
        var htmlBody = ReactDOMServer.renderToStaticMarkup(
          body(
            null,
            main({id: 'app', dangerouslySetInnerHTML: {__html: markup}}),
            script({src: '/bundle_topic.js'})
          )
        );
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlHead + htmlBody);
      }
    })
  }
};
const server_Post = {
  post_Index_NewTopic: function(req, res){
    jsonfile.readFile(topicFile, function(err, data){
      if(err) {
        throw err;
      }else{
        data.topicSaved.push({"id": req.body.id, "topic": req.body.topic, "url": req.body.url});
        jsonfile.writeFile(topicFile, data, function(err){
          if(err) throw err;
        });
        res.send(data);
      }
    });
    jsonfile.readFile(wallHistory, function(err, data){
      if(err) {
        throw err;
      }else{
        let original = data.rowOriginal;
        data[req.body.id] = {
          "rowOne":original,
          "rowTwo": original,
          "rowThree": original,
          "rowFour": original
        };
        server_Post.writeJsonFile(data);
      }
    });
  },
  postRow: function(req, res){
    jsonfile.readFile(wallHistory, function(err, data){
      if(err) {
        throw err;
      }else{
        /*
        switch (req.body.rowId) {
          case 'rowOne':
            var newData = {
              "rowOne": req.body.rowCode,
              "rowTwo": data.rowTwo,
              "rowThree": data.rowThree,
              "rowFour": data.rowFour,
              "rowOriginal": data.rowOriginal
            }
            server_Post.writeJsonFile(newData);
            break;
          case 'rowTwo':
            var newData = {
              "rowOne": data.rowOne,
              "rowTwo": req.body.rowCode,
              "rowThree": data.rowThree,
              "rowFour": data.rowFour,
              "rowOriginal": data.rowOriginal
            }
            server_Post.writeJsonFile(newData);
            break;
          case 'rowThree':
            var newData = {
              "rowOne": data.rowOne,
              "rowTwo": data.rowTwo,
              "rowThree": req.body.rowCode,
              "rowFour": data.rowFour,
              "rowOriginal": data.rowOriginal
            }
            server_Post.writeJsonFile(newData);
            break;
          case 'rowFour':
            var newData = {
              "rowOne": data.rowOne,
              "rowTwo": data.rowTwo,
              "rowThree": data.rowThree,
              "rowFour": req.body.rowCode,
              "rowOriginal": data.rowOriginal
            }
            server_Post.writeJsonFile(newData);
            break;
          default:
          var newData = {
            "rowOne": data.rowOne,
            "rowTwo": data.rowTwo,
            "rowThree": data.rowThree,
            "rowFour": data.rowFour,
            "rowOriginal": req.body.rowCode
          }
          server_Post.writeJsonFile(newData);
        };
        */
        console.log(req.originalUrl);
        res.send("Update success!");
      }
    });
  },
  writeJsonFile: function (newData) {
    jsonfile.writeFile(wallHistory, newData, function(err){
      if(err) throw err;
    });
  }
};

app.set('view engine', 'jsx');
app.set('views', __dirname + '/views');
app.engine('jsx', require('express-react-views').createEngine({ transformViews: false }));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/colorbox-master'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/data'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/bundle_index.js', function(req, res){
  res.setHeader('content-type', 'application/javascript');

  browserify({debug: true})
    .transform(babelify.configure({
      presets: ["react", "es2015"],
      compact: false
    }))
    .require("./js/app_index.js", {entry: true})
    .bundle()
    .pipe(res);
});

app.use('/bundle_topic.js', function(req, res){
  res.setHeader('content-type', 'application/javascript');

  browserify({debug: true})
    .transform(babelify.configure({
      presets: ["react", "es2015"],
      compact: false
    }))
    .require("./js/app_topic.js", {entry: true})
    .bundle()
    .pipe(res);
});

app.get('/', function(req, res){
  server_Get.index(req, res);
})

app.get('/topic.jsx', function(req, res){
  server_Get.topicPage(req, res);
});

app.post('/rowupdate', function(req, res){
  server_Post.postRow(req, res);
});

app.post('/index/newtopic', function(req, res){
  server_Post.post_Index_NewTopic(req, res);
});


app.listen(3000);
console.log("Running at Port 3000~");
