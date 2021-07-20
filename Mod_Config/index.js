const core = require('@actions/core');
const github = require('@actions/github');
const { Base64 } = require("js-base64");
const { createActionAuth } = require("@octokit/auth-action");
const { Octokit } = require("@octokit/rest");

async function overwriteFile(repoToken, pathFile) {

  const octokit = github.getOctokit(repoToken);

  const { payload: { repository } } = github.context;

  const repoFullName = repository.full_name;

  if (repoFullName) {
  
      const [owner, repo] = repoFullName.split("/");
      const sha = await getSHA(owner, repo, pathFile, octokit);
      const content = Base64.encode("actualice el documento:");
    
      const httpResult= await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: pathFile,
        message: 'update master.xml',
        content: content,
        sha
        }
      );

      console.log(httpResult);

  

  }
 
}

async function getSHA(owner, repo, path, octokit) {

  console.log("pathFile : " + path);
  console.log("owner : " + owner);
  console.log("repo : " + repo);

  const result = await octokit.repos.getContent({ owner, repo, path, });

  const sha = result.data.sha;

  return sha;
}

async function Run() {
  try {
    const url = core.getInput('files-added');
    const repo_token = core.getInput('token');
    const url_config_token = core.getInput('url-config').split(";");

    console.log("REPO : " + repo_token);
    if (url_config_token && url) {
      var url_config = url_config_token[0];
      var url_config = url_config;
      overwriteFile(repo_token, url_config);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
  

}
Run();