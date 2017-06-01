const fs = require('fs');
var credentials = require("./watson_vr_variable.js").credentials
var watsonVR = require('watson-developer-cloud').visual_recognition(credentials);
var storage_conn = require('../obj_storage/pkg_cloud_storage_conn.js')
var variables = require("../config/variables.js").variables


function prepareTrainingStreams() {
  /*
    Function that prepares streams that were downloaded into a 
    params JSON object used in specifying values to the custom classifier
  */
	return new Promise((resolve, reject) => {
      var params = {
		name: variables.classifier_name,
		sedan_positive_examples: fs.createReadStream(variables.positive_example_1),
		suv_positive_examples: fs.createReadStream(variables.positive_example_2),
		negative_examples: fs.createReadStream(variables.negative_example)    
	  }
	  resolve(params);
	})
}



function createCustomClassifier(params){
  /*
    Function that calls the library built-in classifier function and deleting the files used afterwards.
     @param {JSON}	params			parameters (classifier name, filestreams) specified for custom classification
  */
  watsonVR.createClassifier(
    params,
    function(err, response) {
      if (err){
        console.log('Error while trying to create classifier.')
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




function classifyObjects(params) {
	/*
      This section classifies a set of images provided. It works just fine with .zip files not more than 20
      different pictures and not larger than 5MB.
   */
  watsonVR.classify(params, function(err, res) {
    if (err)
      console.log(err);
    else{
      console.log("Classifying Image");
      res.images.forEach(function(image, idx, res_array){
        if (image.classifiers.length > 0) {
          console.log('Object class is: '+image.classifiers[0].classes[0].class+', score is '+image.classifiers[0].classes[0].score)
        }
        else{
          console.log('Below classification threshold')
        }
      })
    }      
  });
}


module.exports.classifyObjects = classifyObjects
module.exports.createCustomClassifier = createCustomClassifier
module.exports.prepareTrainingStreams = prepareTrainingStreams

