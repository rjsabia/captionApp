require('dotenv').config();
var express = require('express')
    , router = express()
    , aws = require('aws-sdk');
var path = require('path');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const request = require('request');

const {PORT, DATABASE_URL} = require('./config');

const app = express();

const {router: usersRouter} = require('./users');

app.use('/', express.static('public'));

// console.log(process.env)
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;


app.get('/sign', function(req, res) {
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

  var s3 = new aws.S3()
  var options = {
    Bucket: S3_BUCKET,
    Key: req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', options, function(err, data){
    if(err) return res.send('Error with S3')
      // !!!!this console log returns pic URL, I think
      console.log('this should be url for pic: ' + data);
      
      res.json({
        signed_request: data,
        url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name,
        
      })
    })
  })

app.get('/api/rekog', function(req,res){

  request({
      uri:'https://b5hrtlne7l.execute-api.us-east-1.amazonaws.com/dev/analysis',
      method:'POST',
      json:true,
      body:{ "bucket": S3_BUCKET, "imageName": req.query.file_name},
      headers:{
        'Content-Type':'application/json'
      }
    },function(error,response,body){
      // console.log(response.statusCode)
      console.log(body)
      res.status(response.statusCode).json(body);
    }
  )
})

var cors = require('cors');
app.use(cors());
app.use('/users', usersRouter);
// test code for login
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(flash());

mongoose.Promise = global.Promise;

app.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {router, app, runServer, closeServer};
