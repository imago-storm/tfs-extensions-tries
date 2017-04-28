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
var path = '/tmp/artifact1';
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
