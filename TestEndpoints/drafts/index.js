"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ef_client_1 = require("ef-client");
// my $redirect            = $query->param("redirectTo");
// my @files               = $query->param("files");
// my $errType             = $query->param("errType");
// my $artifactName        = $query->param("artifactName");
// my $newArtifactVersion  = $query->param("artifactVersionVersion");
// my $repositoryName      = $query->param("repositoryName");
// my $compress            = $query->param("compress");
// my $dependentList       = $query->param("dependentArtifactVersionList");
// my $includePatternList  = $query->param("includePatternList");
// my $excludePatternList  = $query->param("excludePatternList");
// my $sessionId           = $query->param("commanderSessionId");
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// var form = new FormData();
// form.append('artifactName', 'org.mycompany:artifact');
// form.append('artifact.txt', new Buffer('data'));
// var request = https.request({
//   method: 'post',
//   host: 'ubuntu-esxi',
//   path: '/commander/cgi-bin/publishArtifactAPI.cgi',
//   headers: form.getHeaders()
// });
// form.pipe(request);
// request.on('response', function(res) {
//   console.log(res.statusCode);
//   // console.log(res);
// });
// request.end();
// throw new Error('stop');
var path = '/tmp/artifact';
var artifactName = 'org.mycompany:artifact';
var repositoryName = 'default';
var artifactVersion = '3';
var efClient = new ef_client_1.EFClient('https://ubuntu-esxi', 'admin', 'changeme', true);
var loginPromise = efClient.login();
var publishArtifactPromise = loginPromise.then(function (res) {
    var sessionId = res.sessionId;
    return efClient.publishArtifact(path, artifactName, artifactVersion, repositoryName, sessionId);
});
publishArtifactPromise.then(function (res) {
    var responseString = res.response;
    if ("Artifact-Published-OK" != responseString) {
        console.log("Publish failed");
        console.log(responseString);
    }
    else {
        console.log("artifact published");
    }
}).catch(function (e) {
    console.log("publish failed");
    console.log(e);
});
// let loginPromise = efClient.post("/sessions", {userName: "admin", password: "changeme"}, '');
// loginPromise.then((res) => {
//     let sessionId = res.sessionId;
//     return publishArtifact(sessionId, "/tmp/artifact");
// }).then((res) => {
//     console.log("Publish result");
//     console.log(res);
// }).catch((e) => {
//     console.log("Failed");
//     console.log(e);
// });
// let publishArtifact = function(sessionId: string, filename: string) {
//     let def = q.defer();
//     let data = fs.readFileSync(filename);
//     let port = 443;
//     let query = "artifactName=org.mycompany.myartifact&artifactVersionVersion=1.0.0&commanderSessionId=" + sessionId;
//     query = "";
//     let form = new FormData();
//     form.append("files", fs.createReadStream('/tmp/artifact'));
//     form.append("artifactName", "org.mycompany:artifact1");
//     form.append("artifactVersionVersion", "1");
//     form.append("commanderSessionId", sessionId);
//     form.append("action", 'publishArtifact');
//     form.append("repositoryName", 'default');
//     form.append('compress', "1");
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//     let options = {
//         host: 'ubuntu-esxi',
//         port: port,
//         method: 'POST',
//         path: '/commander/cgi-bin/publishArtifactAPI.cgi',
//         auth: 'admin' + ':' + 'changeme',
//         protocol: 'https:'
//     };
//     let req = form.submit(options);
//     req.on('response', (res) => {
//         res.setEncoding('utf8');
//         let responseString = "";
//         res.on('data', (chunk) => {
//             responseString += chunk;
//         }).on('end', () => {
//             if (res.responseCode == 200) {
//                 console.log(responseString);
//                 def.resolve(responseString);
//             }
//             else {
//                 def.reject(responseString);
//             }
//         });
//     }).on('error', (e) => {
//         def.reject(e);
//     });
//     return def.promise;
// };
// publishArtifact("/tmp/artifact");
// request(path: string, method: string, query: any, payload: string) {
//     var def = q.defer();
//     let endpoint = this.endpoint;
//     let port = endpoint.port ? parseInt(endpoint.port) : 443;
//     if (this.skipCertCheck) {
//         process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//     }
//     let queryString = "";
//     if (query) {
//         let pairs = new Array();
//         for(let key in query) {
//             let value = query[key];
//             pairs.push(key + "=" + querystring.escape(value));
//         }
//         queryString = '?' + pairs.join("&");
//     }
//     var options = {
//         host: endpoint.hostname,
//         port: port,
//         method: method,
//         path: endpoint.path + path + queryString,
//         auth: this.username + ':' + this.password,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     };
//     console.log(options);
//     var responseString = "";
//     let req = https.request(options, (res) => {
//         res.setEncoding('utf8');
//         res.on('data', (chunk) => {
//             responseString += chunk;
//         });
//         res.on('end', () => {
//             let statusCode = res.statusCode;
//             if (statusCode == 200) {
//                 var responseObject = JSON.parse(responseString);
//                 def.resolve(responseObject);
//             }
//             else {
//                 def.reject({statusCode: statusCode, response: JSON.parse(responseString)});
//             }
//         })
//     }).on('error', (e) => {
//         console.log('http request error');
//         def.reject(e);
//     });
//     if (payload) {
//         req.write(payload);
//     }
//     req.end();
//     return def.promise;
// }
// function writeBinaryPostData(req, filepath) {
//     var fs = require('fs'),
//         data = fs.readFileSync(filepath);
//     var crlf = "\r\n",
//         boundaryKey = Math.random().toString(16),
//         boundary = `--${boundaryKey}`,
//         delimeter = `${crlf}--${boundary}`,
//         headers = [
//           'Content-Disposition: form-data; name="file"; filename="test.txt"' + crlf
//         ],
//         closeDelimeter = `${delimeter}--`,
//         multipartBody;
//     multipartBody = Buffer.concat([
//         new Buffer(delimeter + crlf + headers.join('') + crlf),
//         data,
//         new Buffer(closeDelimeter)]
//     );
//     req.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
//     req.setHeader('Content-Length', multipartBody.length);
//     req.write(multipartBody);
//     req.end();
// }
