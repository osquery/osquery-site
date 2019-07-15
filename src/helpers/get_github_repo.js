const getGithubRepo = (owner, repo) => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}`, { method: 'get' }).then(response =>
    response.json()
  )
}

export default getGithubRepo
