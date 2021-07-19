const core = require('@actions/core');
const github = require('@actions/github');
const { Base64 } = require("js-base64");
const { createActionAuth } = require("@octokit/auth-action");
const { Octokit } = require("@octokit/rest");

async function overwriteFile(repoToken,pathFile)
{
  const auth = createActionAuth();
  const authentication = await auth();
  const octokit = new Octokit({
    authentication,
  });
  const {payload: {repository} } = github.context;
    
  const repoFullName = repository.full_name;

  if(repoFullName)
  {
    const [owner,repo] = repoFullName.split("/");

    console.log("pathFile : "+ pathFile);
    console.log("owner : "+owner);
    console.log("repo : "+repo);
  }  

}

async function getSHA(owner,repo,path) 
{
  const repo_Token = core.getInput('token');
  const octokit = github.getOctokit(repo_Token);
  const result = await octokit.repos.getContents({ owner, repo, path, });
  console.log("Resultado:"+result);
  const sha = result.data.sha;
  return sha;
}

async function Run(){
try {
    const url = core.getInput('files-added');
    const repo_token = core.getInput('token');
    const url_config_token = core.getInput('url-config').split(" ");
    // var branch = context.payload.pull_request.head.ref;
    console.log("url_config : "+url_config_token);
    if(url_config_token && url )
    {
      var url_config = url_config_token[0];
      var url_config = url_config + "/config.txt"
      overwriteFile(repo_token,url_config);

    }
    
    

    
  } catch (error) {
    core.setFailed(error.message);
  }

}
Run();