import {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'

import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import GITHUB_API_KEY from '../../utils/config'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Repositories = () => {
  const {username} = useContext(GithubContext)

  const [repos, setRepos] = useState([])
  const [apiStatus, setApiStatus] = useState('')

  const fetchRepos = async () => {
    setApiStatus(apiStatusConstants.loading)

    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${GITHUB_API_KEY}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      setRepos(data)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    if (username !== '') {
      fetchRepos()
    }
  }, [username])

  if (username === '') {
    return (
      <div className="no-username-container">
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766917027/box_rix5ib.png"
          alt="no repositories"
          className="empty-img"
        />
        <p>No Data Found</p>
        <p>
          GitHub username is empty, please provide a valid username for
          Repositories
        </p>
        <Link to="/">
          <button type="button">Go to Home</button>
        </Link>
      </div>
    )
  }

  if (apiStatus === apiStatusConstants.loading) {
    return <LoaderView />
  }

  if (apiStatus === apiStatusConstants.failure) {
    return <FailureView onRetry={fetchRepos} />
  }

  if (repos.length === 0) {
    return (
      <div className="no-repos-container">
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766915191/no_repos_m3heul.png"
          alt="no repositories"
          className="empty-img"
        />
        <p className="no-repos-message">No Repositories Found</p>
      </div>
    )
  }

  return (
    <div className="repo-page">
      <h1 className="repo-heading">Repositories</h1>

      <ul className="repo-list">
        {repos.map(repo => (
          <li key={repo.id} className="repo-item">
            <Link to={`/repositories/${repo.name}`} className="repo-link">
              <p className="repo-title">{repo.name}</p>
              <p className="repo-description">{repo.description}</p>

              <ul className="topics-list">
                {repo.topics.map(topic => (
                  <li key={topic} className="topic-tag">
                    {topic}
                  </li>
                ))}
              </ul>

              <div className="repo-stats">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🔀 {repo.forks_count}</span>
                <span>❗ {repo.open_issues_count}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Repositories
