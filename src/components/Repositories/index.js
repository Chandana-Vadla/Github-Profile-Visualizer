import {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'

import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

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

    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${process.env.REACT_APP_GITHUB_API_KEY}`
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
    // eslint-disable-next-line
  }, [])

  if (username === '') {
    return (
      <>
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766917027/box_rix5ib.png"
          alt="empty analysis"
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
    <ul className="repo-list">
      {repos.map(repo => (
        <li key={repo.id}>
          <Link to={`/repositories/${repo.name}`} data-testid="repoItem">
            <h1>{repo.name}</h1>
            <p>{repo.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Repositories
