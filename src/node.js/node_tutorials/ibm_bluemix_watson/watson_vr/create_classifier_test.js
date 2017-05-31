var fs = require('fs');
var watsonVR = require('./watson_vr_conn.js').watsonVR 
/*
var params = {
  name: 'cars',
  sedan_positive_examples: fs.createReadStream('./sedan.zip'),
  suv_positive_examples: fs.createReadStream('./suv.zip'),
  negative_examples: fs.createReadStream('./neg.zip')    
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
  classifier_id: 'car_403572413' },
  function(err, response) {
   if (err)
    console.log(err);
   else
    console.log(JSON.stringify(response, null, 2));
  }
);
