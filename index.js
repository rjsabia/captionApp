require('dotenv').config();
const ImageAnalyser = require('./imageAnalyser');
var express = require('express')
    , router = express()
    , aws = require('aws-sdk');
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'./index.html'))
  })

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
      //add Rekog here
    })
  })
// router.get('/rekog', function(req, res){
//   aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  
//   const s3Config = {
//             bucket: S3_BUCKET,
//             imageName: req.query.file_name,
//           };

//           return ImageAnalyser
//             .getImageLabels(s3Config)
//             .then((labels) => {
//               res.json({
//                 url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name,
//                 Labels: labels
//               })
//             })
//             .catch((error) => {
//               res.status(500).send(error);
//             });
//           })


router.listen(3000);

module.exports = router