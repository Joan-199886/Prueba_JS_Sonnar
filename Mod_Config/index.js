const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


try {
 

    const url = core.getInput('files-added');
    const token = core.getInput('token').split('');
    const url_config = core.getInput('url-config').split('');
    
    const url2 = url_config.join("");

    console.log("====================================================");
    console.log("url: "+url);
    console.log("url config: "+ url_config.join(""));
    console.log("token: "+token.join("") );
    console.log(url2);
    
  } catch (error) {
    core.setFailed(error.message);
  }

