const fs = require('fs');
var storage_conn = require('./pkg_cloud_storage_conn.js')
var variables = require("../config/variables.js").variables

storage_conn.resetContainerThenUpload(variables.container, storage_conn.storageClient)

