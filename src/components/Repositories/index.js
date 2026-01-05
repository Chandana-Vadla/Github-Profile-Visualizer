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

  // ✅ FIX: depend on username
  useEffect(() => {
    if (username !== '') {
      fetchRepos()
    }
  }, [username])

  // ✅ No username case
  if (username === '') {
    return (
      <>
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766917027/box_rix5ib.png"
          alt="empty repositories"
        />
        <p>No Data Found</p>
        <p>
          GitHub Username is empty, please provide a valid username for
          Repositories
        </p>
        <Link to="/">
          <button type="button">Go to Home</button>
        </Link>
      </>
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
      <img
        src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766915191/no_repos_m3heul.png"
        alt="no repositories"
      />
    )
  }

  return (
    <div className="repos-container">
      <h1 className="title">Repositories</h1>
      <ul className="repo-list">
        {repos.map(repo => (
          <li className="repo-container" key={repo.id}>
            <Link to={`/repositories/${repo.name}`} data-testid="repoItem">
              <h1 className="repo-name">{repo.name}</h1>
            </Link>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Repositories
