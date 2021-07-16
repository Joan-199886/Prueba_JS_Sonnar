const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


try {
 

    const url = core.getInput('files-added');
    const token = core.getInput('token');
    const url_config = core.getInput('url-config');


    var secrets = JSON.parse(process.env.SECRETS);
    console.log("====================================================");
    console.log("SECRETS"+secrets[0]);
    console.log("url: "+url);
    console.log("url config: "+ url_config);
    console.log("token: "+token);
    
  } catch (error) {
    core.setFailed(error.message);
  }

