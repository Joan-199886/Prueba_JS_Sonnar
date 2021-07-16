const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");

async function Run()
{
try {

    const auth = createActionAuth();
    const authentication = await auth();
    
    const url = core.getInput('files-added');
    const token = core.getInput('token');
    const url_config = core.getInput('url-config');


    var secrets = JSON.parse(process.env.SECRETS);

    console.log("SECRETS"+secrets);
    console.log("url: "+url);
    console.log("url config: "+ url_config);
    console.log("token: "+token);
    
  } catch (error) {
    core.setFailed(error.message);
  }
}
