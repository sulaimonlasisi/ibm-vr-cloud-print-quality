const fs = require('fs');
const client = require('../obj_storage/pkg_cloud_storage_conn.js').storageClient
var watsonVR = require('./watson_vr_conn.js').watsonVR 

const suv_pfx = 'suvs'
const sed_pfx = 'sedans'
const neg_pfx = 'neg'
client.getFiles('9ja_drinks_custom_classifier_container', function (err, files, i){
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
  }
})
watsonVR.createClassifier(
{
  name: 'car',  //this will be passed in via the UI
  suv_positive_examples: fs.createReadStream('./'+suv_pfx+'.zip'),
  sedan_positive_examples: fs.createReadStream('./'+sed_pfx+'.zip'),
  negative_examples: fs.createReadStream('./'+neg_pfx+'.zip')
},
function(err, response){
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(response, null, 2));
    /*fs.unlink('./'+suv_pfx+'.zip') //delete files used to create classifier
    fs.unlink('./'+sed_pfx+'.zip')
    fs.unlink('./'+neg_pfx+'.zip')*/
});

/*
var params = {
  images_file: fs.createReadStream('./cars_test.zip'),
  threshold: 0.7,
  classifier_ids: "car_403572413"
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
*/