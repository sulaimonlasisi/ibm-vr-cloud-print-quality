var fs = require('fs');
var watsonVR = require('./watson_vr_conn.js').watsonVR
var variables = require("../config/variables.js").variables

/*
Function to create a classifier from files available locally

var params = {
  name: 'cars',
  sedan_positive_examples: fs.createReadStream(variables.positive_example_1),
  suv_positive_examples: fs.createReadStream(variables.positive_example_2),
  negative_examples: fs.createReadStream(variables.negative_example)    
};

watsonVR.createClassifier(params,
  function(err, response) {
    if (err)
    	console.log(err);
    else
    console.log(JSON.stringify(response, null, 2));
});
*/

watsonVR.getClassifier({
  classifier_id: variables.classifier_id },
  function(err, response) {
   if (err)
    console.log(err);
   else
    console.log(JSON.stringify(response, null, 2));
  }
);
