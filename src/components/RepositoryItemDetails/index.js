import {useEffect, useState, useContext, useCallback} from 'react'
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

const RepositoryItemDetails = props => {
  const {match} = props
  const {repoName} = match.params
  const {username} = useContext(GithubContext)

  const [repoDetails, setRepoDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const retryFetchRepoDetails = useCallback(() => {
    const fetchRepoDetails = async () => {
      setApiStatus(apiStatusConstants.loading)

      const apiUrl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=${GITHUB_API_KEY}`

      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        setRepoDetails(data)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    if (username !== '') {
      fetchRepoDetails()
    }
  }, [username, repoName])

  useEffect(() => {
    retryFetchRepoDetails()
  }, [retryFetchRepoDetails])

  if (apiStatus === apiStatusConstants.loading) return <LoaderView />
  if (apiStatus === apiStatusConstants.failure)
    return <FailureView onRetry={retryFetchRepoDetails} />

  if (!repoDetails) return null

  return (
    <div className="repo-details-container">
      <img
        src={repoDetails.owner.avatar_url}
        alt={repoDetails.owner.login}
        className="repo-owner-img"
      />
      <h1>{repoDetails.name}</h1>
    </div>
  )
}

export default RepositoryItemDetails
