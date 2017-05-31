const fs = require('fs');
const client = require('../obj_storage/pkg_cloud_storage_conn.js').storageClient
var watsonVR = require('./watson_vr_conn.js').watsonVR
var variables = require("../config/variables.js").variables


//This section creates a classifier anew by pulling data from ObjectStorage, creating custom classifiers with it and deleting the files 
//that were saved locally from ObjectStorage.
client.getFiles(variables.container, function (err, files){
  console.log("File size is "+ files.length);
  if (err) {
    console.log("Error occurred while trying to download file from object container ");
    console.error(err);
  }
  else{
    files.forEach(function(file,index){
      console.log("File "+index+" is "+file.name)
      stream_name = file.name
      stream = fs.createWriteStream(stream_name)
      stream.on('error', function() {
          console.log('error');
      });
      stream.on('finish', function() {
          console.log('done');
      });
      client.download({
          container: file.container,
          remote: file.name
      }).pipe(stream);      
    })
    watsonVR.createClassifier(
    {  
      name: 'car',  //this will be passed in via the UI
      suv_positive_examples: fs.createReadStream(variables.positive_example_2),
      sedan_positive_examples: fs.createReadStream(variables.positive_example_1),
      negative_examples: fs.createReadStream(variables.negative_example)
    },
    function(err, response){
      if (err)
        console.log(err);
      else
        console.log(JSON.stringify(response, null, 2));
        fs.unlink(variables.positive_example_2) //delete files used to create classifier
        fs.unlink(variables.positive_example_1)
        fs.unlink(variables.negative_example)
    });
  }
})




/*
This section classifies a set of images provided. It works just fine with .zip files not more than 20
different pictures and not larger than 5MB.

var params = {
  images_file: fs.createReadStream(variables.test_file),
  threshold: variables.threshold,
  classifier_ids: variables.classifier_id
};

watsonVR.classify(params, function(err, res) {
  if (err)
    console.log(err);
  else
    res.images.forEach(function(image, idx, res_array){
      if (image.classifiers.length > 0) {
        console.log('Object has been classified as a: '+image.classifiers[0].classes[0].class+' with a '+image.classifiers[0].classes[0].score+' confidence value.')
      }
    })
    //console.log(JSON.stringify(res, null, 2));
});
*/
