const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");
const { Base64 } = require("js-base64");

async function Run(){
try {
    const url = core.getInput('files-added');
    const repotoken = core.getInput('token');
    const url_config = core.getInput('url-config');
    // var branch = context.payload.pull_request.head.ref;

    const {payload: {repository} } = github.context;

    const repoFullName = repository.full_name;

    console.log("RepoFullName:"+repoFullName);
    
    if(url_config && url)
    {
      console.log("Url_Config : "+url_config.split(""));
      console.log("Url :"+url.split(""));
    }
    
    

    
  } catch (error) {
    core.setFailed(error.message);
  }

}
Run();