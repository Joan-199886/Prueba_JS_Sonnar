const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");

try {

    const url = core.getInput('files-added');
    const token = core.getInput('token');
    console.log("url: "+url);
    console.log("token: "+token);

    const auth = createActionAuth();
    const authentication = await auth();


  } catch (error) {
    core.setFailed(error.message);
  }
