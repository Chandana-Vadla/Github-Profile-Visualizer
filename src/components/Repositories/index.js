import {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import GITHUB_API_KEY from '../../utils/config'

import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Repositories = () => {
  const {username} = useContext(GithubContext)

  const [reposList, setReposList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const fetchRepositories = async () => {
    setApiStatus(apiStatusConstants.loading)

    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${GITHUB_API_KEY}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      setReposList(data)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    if (username !== '') {
      fetchRepositories()
    }
    // eslint-disable-next-line
  }, [username])

  const renderRepositoriesView = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderView />

      case apiStatusConstants.failure:
        return <FailureView onRetry={fetchRepositories} />

      case apiStatusConstants.success:
        if (reposList.length === 0) {
          return (
            <div className="no-data-container">
              <img
                src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1765715812/Layer_3_nzotlx.png"
                alt="no repositories"
                className="no-data-image"
              />
              <h1 className="no-data-title">No Repositories Found!</h1>
            </div>
          )
        }

        return (
          <div className="repo-list">
            {reposList.map(repo => (
              <Link
                to={`/repositories/${repo.name}`}
                key={repo.id}
                className="repo-card"
                data-testid="repoItem"
              >
                <h1 className="repo-name">{repo.name}</h1>
                <p className="repo-description">{repo.description}</p>

                <div className="repo-tags">
                  {repo.languages.map(each => (
                    <span key={each.name} className="repo-tag">
                      {each.name}
                    </span>
                  ))}
                </div>

                <div className="repo-stats">
                  <p>⭐ {repo.stargazers_count}</p>
                  <p>🍴 {repo.forks_count}</p>
                </div>
              </Link>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  if (username === '') {
    return (
      <div className="no-data-container">
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1765715812/Layer_3_nzotlx.png"
          alt="empty repositories"
          className="no-data-image"
        />
        <h1 className="no-data-title">No Data Found</h1>
      </div>
    )
  }

  return (
    <div className="repositories-container">
      <h1 className="repositories-title">Repositories</h1>
      {renderRepositoriesView()}
    </div>
  )
}

export default Repositories
