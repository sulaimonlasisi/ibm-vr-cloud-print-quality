const fs = require('fs');
var storage_conn = require('../public/javascripts/obj_storage/pkg_cloud_storage_conn.js')
var watson_conn = require('../public/javascripts/watson_vr/watson_vr_conn.js')
var variables = require('../public/javascripts/config/variables.js').variables


/*
Call to create custom classifier
*/
exports.createClassifier = function(req, res) {
	

	//change variables.container to an input from request	
	storage_conn.getContainerFiles(variables.container)
	.then((files) => storage_conn.prepareDownloadStreams(files))
	.then(()=> watson_conn.prepareTrainingStreams())
	.then((params) => watson_conn.createCustomClassifier(params))
	.then((info) => res.send(info))
}


/*
Function to classify a given object with specified parameters
*/

var classifier_params = {
  //images_file: fs.createReadStream(variables.test_file),
  images_file: fs.createReadStream(variables.test_zip_file),
  threshold: variables.threshold,
  classifier_ids: variables.classifier_id
};
exports.classify = function(req, res) {
	//change classifier_params to an input from request
    watson_conn.classifyObjects(classifier_params).then((array) => res.send(array))
}


/*Function to list all classifiers*/

exports.listClassifiers = function (req, res) {
	// body...
    watson_conn.listClassifiers().then((info) => res.send(info))
}

exports.getClassifierDetails = function (req, res) {
	watson_conn.getClassifierDetails(variables.classifier_id).then((info) => res.send(info))
}
