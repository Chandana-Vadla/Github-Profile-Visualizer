import {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'

import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

const RepositoryItemDetails = () => {
  const {username} = useContext(GithubContext)
  const {repoName} = useParams()

  const [repoDetails, setRepoDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState('')

  const fetchRepoDetails = async () => {
    setApiStatus('LOADING')

    const apiUrl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=${process.env.REACT_APP_GITHUB_API_KEY}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      setRepoDetails(data)
      setApiStatus('SUCCESS')
    } else {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    fetchRepoDetails()
    // eslint-disable-next-line
  }, [])

  if (apiStatus === 'LOADING') {
    return <LoaderView />
  }

  if (apiStatus === 'FAILURE') {
    return <FailureView onRetry={fetchRepoDetails} />
  }

  if (!repoDetails) {
    return null
  }

  return (
    <div>
      <h1>{repoDetails.name}</h1>

      <ul>
        {repoDetails.contributors.map(each => (
          <li key={each.id}>
            <img src={each.avatar_url} alt="contributor profile" />
            <p>{each.login}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepositoryItemDetails
