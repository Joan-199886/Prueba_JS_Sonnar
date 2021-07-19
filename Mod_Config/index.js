const core = require('@actions/core');
const github = require('@actions/github');
const { Base64 } = require("js-base64");
const { Octokit } = require("@octokit/rest");


async function overwriteFile(repoToken,pathFile)
{
  const octokit = new Octokit({
    auth: repoToken
  });
    
    const {payload: {repository} } = github.context;

    const repoFullName = repository.full_name;


    if(repoFullName)
    {
      const [owner,repo] = repoFullName.split("/");

      var master="El archivo ha sido modificado " + pathFile;

      const octokit = github.getOctokit(repoToken);
      const contentFile = Base64.encode(master);

      console.log("SHA :"+sha);
      console.log("OWNER : "+owner);
      console.log("REPO : "+repo);
      console.log("PATH FILE CONFIG : "+pathFile);

      const httpResult= await octokit.repos.createOrUpdateFileContents({
        // replace the owner and email with your own details
        owner: owner,
        repo: repo,
        path: pathFile,
        message: "feat: Added OUTPUT.md programatically",
        content: contentFile,
        committer: {
          name: `Octokit Bot`,
          email: "joan-herrera@upc.edu.co",
        },
        author: {
          name: "Octokit Bot",
          email: "joan-herrera@upc.edu.co",
        },
      });
      console.log(httpResult);
      return httpResult.status.toString();
      
    }
    
}

async function getSHA(owner,repo,path) {
  const repo_Token = core.getInput('token');
  const octokit = github.getOctokit(repo_Token);
  const result = await octokit.repos.getContent({ owner, repo, path });
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