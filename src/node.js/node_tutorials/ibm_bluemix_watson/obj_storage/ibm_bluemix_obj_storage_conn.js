var ObjectStorage = require('bluemix-objectstorage').ObjectStorage
const fs = require("fs")
var fileName = "../config/obj_storage_credentials.json"
var credentials
try {
credentials = require(fileName)
//console.log("Reqion: "+credentials.region+", projectId: " + credentials.projectId + ", user-id:  "+credentials.userId+ ", pw:  "+credentials.password)
} 
catch(err) {
  credentials = {}
  console.log("unable to read file '" + fileName + "': ", err)
};

//console.log("IBM session secret is:", credentials.projectId)
var objStorage = new ObjectStorage(credentials)

module.exports.objStorage = objStorage
