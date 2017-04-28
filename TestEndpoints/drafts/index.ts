import {EFClient} from "ef-client";

import fs = require('fs');
import process = require('process');
import https = require('https');
import q = require('q');
import FormData = require('form-data');
// import {BufferConcat} from 'buffer-concat';
import {Buffer} from 'buffer';

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


let path = '/tmp/artifact1';
let artifactName = 'org.mycompany:artifact';
let repositoryName = 'default';
let artifactVersion = '3';

let efClient = new EFClient('https://ubuntu-esxi', 'admin', 'changeme', true);
let loginPromise = efClient.login();
let publishArtifactPromise = loginPromise.then((res: any) => {
    let sessionId = res.sessionId;
    return efClient.publishArtifact(path, artifactName, artifactVersion, repositoryName, sessionId);
});
publishArtifactPromise.then((res: any) => {
    let responseString = res.response;
    if ( "Artifact-Published-OK" != responseString) {
        console.log("Publish failed");
        console.log(responseString);
    }
    else {
        console.log("artifact published");
    }
}).catch((e) => {
    console.log("publish failed");
    console.log(e);
});
