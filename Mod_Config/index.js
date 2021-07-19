const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");
const { Base64 } = require("js-base64");


async function overwriteFile(repoToken,pathFile)
{
    const {payload: {repository} } = github.context;

    const repoFullName = repository.full_name;


    if(repoFullName)
    {
      const [owner,repo] = repoFullName.split("/");

      var master="El archivo ha sido modificado " + pathFile;

      const octokit = github.getOctokit(repoToken);
      const sha = await getSHA(owner,repo,pathFile);
      const contentFile = Base64.encode(master);

      console.log("SHA :"+sha);
      console.log("OWNER : "+owener);
      console.log("REPO : "+repo);
      console.log("PATH FILE CONFIG"+pathFile);

      const httpResult= await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: pathFile,
        message: 'update master.xml',
        content: contentFile,
        branch: "main",
        sha
        }
      );
      console.log(httpResult);
      return httpResult.status.toString();
      
    }
    
}

async function getSHA(owner,repo,path) {
  const repo_Token = core.getInput('token');
  const octokit = github.getOctokit(repo_Token);
  const result = await octokit.repos.getContent({
    owner,
    repo,
    path,
  });
  const sha = result.data.sha;
  return sha;
}

async function Run(){
try {
    const url = core.getInput('files-added');
    const repo_token = core.getInput('token');
    const url_config_token = core.getInput('url-config').split(" ");
    // var branch = context.payload.pull_request.head.ref;

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