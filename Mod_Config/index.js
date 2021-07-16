const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


try {
 

    const url = core.getInput('files-added');
    const token = core.getInput('token').split('').toString();
    const url_config = core.getInput('url-config').split('').join("");
   
 
    console.log("====================================================");
    console.log("url: "+url);
    console.log("url config: "+ url_config);
    console.log("token: "+token );
    
  } catch (error) {
    core.setFailed(error.message);
  }

