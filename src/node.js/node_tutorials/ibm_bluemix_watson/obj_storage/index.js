const fs = require('fs');
var storage_conn = require('./pkg_cloud_storage_conn.js')
var variables = require("../config/variables.js").variables

storage_conn.reset_container_then_upload(variables.container, storage_conn.storageClient)

