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

/*
var mysqlPool = mysql.createPool({
  host:,
  user:,
  password:,
  database:,
  connectionLimit:
})
*/

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

app.use('/bundle.js', function(req, res){
  res.setHeader('content-type', 'application/javascript');

  browserify({debug: true})
    .transform(babelify.configure({
      presets: ["react", "es2015"],
      compact: false
    }))
    .require("./js/app_topicWall.js", {entry: true})
    .bundle()
    .pipe(res);
});

var dataFile = path.join(__dirname+'/data/wallHistory.json');

app.get('/', function(req, res){
  var TopicPage = require('./views/topic_Wall.jsx');
  var markup = ReactDOMServer.renderToString(React.createElement(TopicPage));
  var htmlHead = ReactDOMServer.renderToStaticMarkup(
    head(
      null,
      script({src: "https://unpkg.com/axios/dist/axios.min.js"}),
      script({src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"}),
      script({src: "./opp_topicWall.js", type: "text/javascript"}),
      link({href: "./colorbox.css", rel: "stylesheet"}),
      script({src: "./jquery.colorbox.js", type: "text/javascript"}),
      link({href: "./brick.css", rel: "stylesheet"}),
      script({src: "./opp_newItem.js", type: "text/javascript"})
    )
  );
  var htmlBody = ReactDOMServer.renderToStaticMarkup(
    body(
      null,
      main({id: 'app', dangerouslySetInnerHTML: {__html: markup}}),
      script({src: '/bundle.js'})
    )
  );

  res.setHeader('Content-Type', 'text/html');
  res.end(htmlHead+htmlBody);
  });

//var index_brick = 1;
app.post('/data/rowhistory', function(req, res){
  jsonfile.readFile(dataFile, function(err, data){
    if(err) {
      throw err;
    }else{
      data["row"] = {
        "row":req.body.row
      };
      jsonfile.writeFile(dataFile, data, function(err){
        if(err) throw err;
      });
      //index_brick ++;
      res.send("Update success!");
    }
  });
});

app.listen(3000);
console.log("Running at Port 3000~");
