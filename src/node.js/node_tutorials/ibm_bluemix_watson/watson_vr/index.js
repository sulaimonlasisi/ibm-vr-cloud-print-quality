const fs = require('fs');
const client = require('../obj_storage/pkg_cloud_storage_conn.js').storageClient
var watsonVR = require('./watson_vr_conn.js').watsonVR 
var Promise = require('promise')
var variables = require("../config/variables.js").variables



function getContainerFiles(container_name){
  return new Promise((resolve, reject) => {
    client.getFiles(container_name, (err, files) => {
      if (err) {
        console.log("Error while trying to get container files.");
        reject(err);
      }
      resolve(files);
    })
  })
}

function prepareStreams(files){
  return new Promise((resolve, reject) => {

    files.forEach(function(file,index){
      //console.log("File "+index+" is "+file.name)
      stream_name = file.name
      stream = fs.createWriteStream(stream_name)
      stream.on('error', function() {
        console.log("Error while trying to create stream.");
        console.log('error');
      });
      stream.on('finish', function() {
          if((index+1) === files.length) {
          resolve();
        }
          
      });
      client.download({
          container: file.container,
          remote: file.name
      }).pipe(stream);
    })
  })  
} 



function createCustomClassifier(params){
  watsonVR.createClassifier(
    params = {
      name: variables.classifier_name,  
      suv_positive_examples: fs.createReadStream(variables.positive_example_1),
      sedan_positive_examples: fs.createReadStream(variables.positive_example_2),
      negative_examples: fs.createReadStream(variables.negative_example)
    },
    function(err, response){
      if (err){
        console.log("Error while trying to create classifier.");
        console.log(err);
      }
      else{
        console.log(JSON.stringify(response, null, 2));
        fs.unlink(variables.positive_example_1) //delete files used to create classifier
        fs.unlink(variables.positive_example_2)
        fs.unlink(variables.negative_example)
      }      
    }
  )
}



getContainerFiles(variables.container)
.then((files) => prepareStreams(files))
.then((params) => createCustomClassifier(params))

