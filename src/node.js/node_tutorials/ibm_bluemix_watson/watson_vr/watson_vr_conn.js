var watson = require('watson-developer-cloud');
var fileName = "../config/watson_vr_credentials.json"
var credentials
try {
credentials = require(fileName)
//console.log("Reqion: "+credentials.region+ ", pw:  "+credentials.password)
} 
catch(err) {
  credentials = {}
  console.log("unable to read file '" + fileName + "': ", err)
};

//console.log("IBM session secret is:", credentials.projectId)
var watsonVR = watson.visual_recognition(credentials); 
//objStorage = new ObjectStorage(credentials)

module.exports.watsonVR = watsonVR
