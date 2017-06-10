require('dotenv').config();
const ImageAnalyser = require('./imageAnalyser');
var express = require('express')
    , router = express()
    , aws = require('aws-sdk');
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'./index.html'))
  })

router.use('/js', express.static('client_js'));

router.use('/client_styles', express.static('client_styles'));

console.log(process.env)
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;


router.get('/sign', function(req, res) {
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
      
      res.json({
        signed_request: data,
        url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name,
        
      })
    })
  })

router.get('/api/rekog', function(req,res){
  var request = require('request')

  request({
      uri:'https://b5hrtlne7l.execute-api.us-east-1.amazonaws.com/dev/analysis',
      method:'POST',
      json:true,
      body:{ "bucket": S3_BUCKET, "imageName": req.query.file_name},
      headers:{
        'Content-Type':'application/json'
      }
    },function(error,response,body){
      console.log(response.statusCode)
      console.log(body)
      res.status(response.statusCode).json(body);
    }
  )
})


router.listen(3000);

module.exports = router