var ObjectStorage = require('bluemix-objectstorage').ObjectStorage
const fs = require("fs")
var fileName = "../config/obj_storage_credentials.json"
var credentials
try {
credentials = require(fileName)
} 
catch(err) {
  credentials = {}
  console.log("unable to read file '" + fileName + "': ", err)
};
var objStorage = new ObjectStorage(credentials)
module.exports.objStorage = objStorage
