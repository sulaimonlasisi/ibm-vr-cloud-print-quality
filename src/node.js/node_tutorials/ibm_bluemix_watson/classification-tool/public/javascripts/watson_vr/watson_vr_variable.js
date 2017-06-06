var fileName = "../config/watson_vr_credentials.json"
var credentials
try {
credentials = require(fileName)
} 
catch(err) {
  credentials = {}
  console.log("unable to read file '" + fileName + "': ", err)
};
module.exports.credentials = credentials