import q = require('q');
import http = require('http');
import url = require('url');
import https = require('https');
import querystring = require('querystring');


let efUrl = 'https://160.34.102.105';
let restEndpoint = efUrl + '/rest/v1.0';
let endpoint = url.parse(restEndpoint);
let username = 'admin';
let password = 'changeme';


var getFromEF = function(path: string) {
    var def = q.defer();
    let port = endpoint.port ? parseInt(endpoint.port) : 443;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var options = {
        host: endpoint.hostname,
        port: port,
        path: endpoint.path + path,
        auth: username + ':' + password,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    console.log('GET http://' + options.host + ':' + options.port + options.path);
    var responseString = "";
    https.get(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            responseString += chunk;
        });
        res.on('end', () => {
            let statusCode = res.statusCode;
            if (statusCode == 200) {
                var responseObject = JSON.parse(responseString);
                def.resolve(responseObject);
            }
            else {
                def.reject({statusCode: statusCode, response: JSON.parse(responseString)});
            }
        })
    }).on('error', (e) => {
        console.log('http request error');
        def.reject(e);
    });
    return def.promise;
};


let projectName = 'Default';
let pipelineName = 'Test TFS';

let pipelinesPromise = getFromEF("/projects/" + projectName).then((project: any) => {
    console.log("Found project " + project.project.projectName);
    return getFromEF("/pipelines/" + querystring.escape(pipelineName) + "?projectName=" + querystring.escape(projectName) );
});

pipelinesPromise.then((res) => {
   console.log("Found project and pipeline");
}).catch((e) => {
    console.log("Found error");
    console.log(e);
});

// var getProject = function(projectName: string) {
//     console.log(projectName);
//     getFromEF("/projects/" + projectName).then((res) => {
//         console.log(res);
//     })
//     .then(getPipeline)
//     .catch((e) => {
//         if ( e.statusCode == 404) {
//             console.log("Project " + projectName + " was not found");
//         }
//     });
// }



// let getPromise = function() {
//     let def = q.defer();

//     // promise can be resolved or rejected (other states are not of interest now)
//     if (true) {
//         def.resolve({resolved: true});
//     }
//     else {
//         def.reject({rejected: true});
//     }

//     return def.promise;
// };

// let promise = getPromise();
// console.log(promise);
// promise.then((response: responseType) => {
//     console.log("Promise fulfilled");
//     console.log(response);
// });
