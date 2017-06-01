const fs = require('fs');
var storage_conn = require('../obj_storage/pkg_cloud_storage_conn.js')
var watson_conn = require('./watson_vr_conn.js')
var variables = require("../config/variables.js").variables

/*
Call to create custom classifier
storage_conn.getContainerFiles(variables.container)
.then((files) => storage_conn.prepareDownloadStreams(files))
.then(()=> watson_conn.prepareTrainingStreams())
.then((params) => watson_conn.createCustomClassifier(params))
*/




var classifier_params = {
  //images_file: fs.createReadStream(variables.test_file),
  images_file: fs.createReadStream(variables.test_zip_file),
  threshold: variables.threshold,
  classifier_ids: variables.classifier_id
};
watson_conn.classifyObjects(classifier_params);


