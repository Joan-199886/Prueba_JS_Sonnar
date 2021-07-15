const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const url = core.getInput('files-added');
    console.log(url);
     console.log("holamundo");

  } catch (error) {
    core.setFailed(error.message);
  }
