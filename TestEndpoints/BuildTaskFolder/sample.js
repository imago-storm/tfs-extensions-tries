"use strict";

const tl = require('vsts-task-lib/task');
// Get Environment Manager configuration
var endpoint = tl.getInput('FabrikamService', true);
console.log(endpoint);
var baseUrl = tl.getEndpointUrl(endpoint, true);
console.log(baseUrl);
