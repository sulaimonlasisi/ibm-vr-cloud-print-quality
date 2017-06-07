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
		good_prints_positive_examples: fs.createReadStream(variables.positive_example_1),
		streaks_positive_examples: fs.createReadStream(variables.positive_example_2),
		random_spots_positive_examples: fs.createReadStream(variables.positive_example_3)    
	  }
	  resolve(params);
	})
}



function createCustomClassifier(params){
  /*
    Function that calls the library built-in classifier function and deleting the files used afterwards.
     @param {JSON}	params			parameters (classifier name, filestreams) specified for custom classification
  */
  //console.log(params)
  return new Promise((resolve, reject) => {
    watsonVR.createClassifier(params,function(err, response) {
      if (err){
        console.log('Error while trying to create classifier.')
        console.log(err);
        reject(err);
        
      }
      else{
        fs.unlink(variables.positive_example_1) //delete files used to create classifier
        fs.unlink(variables.positive_example_2)
        fs.unlink(variables.positive_example_3)
        console.log(JSON.stringify(response, null, 2));
        resolve (response);
        //return JSON.stringify(response, null, 2);
      }      
    })
  })  
}




function classifyObjects(params) {
  /*
      This section classifies a set of images provided. It works just fine with .zip files not more than 20
      different pictures and not larger than 5MB.
  */
  return new Promise((resolve, reject) => {
    watsonVR.classify(params, function(err, res) {
      if (err){
        console.log(err);
        reject(err);
      }
      else{
        console.log("Classifying Image");
        var score_array = [];
        var classifier_response
        res.images.forEach(function(image, idx, res_array){
          if (image.classifiers.length > 0) {
            console.log('Object class is: '+image.classifiers[0].classes[0].class+', score is '+image.classifiers[0].classes[0].score)
            classifier_response = 'Object class is: '+image.classifiers[0].classes[0].class+', score is '+image.classifiers[0].classes[0].score
          }
          else{
            console.log('Below classification threshold')
            classifier_response = 'Below classification threshold'
          }
          score_array.push(classifier_response)
        })
        resolve(score_array);
      }      
    });
  })  
}



function listClassifiers (){
  return new Promise((resolve, reject) => {
    watsonVR.listClassifiers({},
      function(err, response) {
       if (err){
          console.log(err);
          reject(err)
       }        
        else{
          //console.log(JSON.stringify(response, null, 2));
          //resolve (JSON.stringify(response, null, 2));
          resolve (response);
        }      
      }
    );
  })
}

function getClassifierDetails(classifier_id) {
  return new Promise((resolve, reject) => {
    watsonVR.getClassifier({
      classifier_id: classifier_id },
      function(err, response) {
        if (err){
          console.log(err);
          reject(err)
        }        
        else{
          resolve (JSON.stringify(response, null, 2));
        }        
      }
    )
  })    
}


module.exports.watsonVR = watsonVR
module.exports.classifyObjects = classifyObjects
module.exports.createCustomClassifier = createCustomClassifier
module.exports.prepareTrainingStreams = prepareTrainingStreams
module.exports.listClassifiers = listClassifiers
module.exports.getClassifierDetails = getClassifierDetails


