'use strict';

const AWS = require('aws-sdk');

// const rek = new AWS.Rekognition();

class ImageAnalyser {

  static getImageLabels(s3Config) {
    AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY});
    
    const rek = new AWS.Rekognition();
    const params = {
      Image: {
        S3Object: {
          Bucket: s3Config.bucket,
          Name: s3Config.imageName,
        },
      },
      MaxLabels: 15,
      MinConfidence: 30,
    };

    console.log(`Analyzing file: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`);

    return new Promise((resolve, reject) => {
      console.log(params, 'params');
      rek.detectLabels(params, (err, data) => {
        console.log(arguments, 'arguments');

        if (err) {
          return reject(new Error(err));
        }
        console.log('Analysis labels:', data.Labels);
        
        return resolve(data.Labels);
      });
    });
  }
}

module.exports = ImageAnalyser;
