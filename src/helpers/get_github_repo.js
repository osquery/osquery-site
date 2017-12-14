import axios from 'axios'

const getGithubRepo = (owner, repo) => {
  return axios({
    method: 'get',
    url: `https://api.github.com/repos/${owner}/${repo}`,
  })
}

export default getGithubRepo
