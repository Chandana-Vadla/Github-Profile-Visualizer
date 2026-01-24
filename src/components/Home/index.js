import {useState, useEffect, useContext} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'

import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Profile from '../Profile'
import GITHUB_API_KEY from '../../utils/config'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = ({onProfileLoaded}) => {
  const [inputValue, setInputValue] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileData, setProfileData] = useState(null)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const isFailure = apiStatus === apiStatusConstants.failure

  const {setUsername} = useContext(GithubContext)

  const fetchProfile = async () => {
    if (inputValue.trim() === '') {
      setShowErrorMessage(true)
      return
    }

    setShowErrorMessage(false)
    setUsername(inputValue)
    setApiStatus(apiStatusConstants.inProgress)

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${inputValue}?api_key=${GITHUB_API_KEY}`

    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        setProfileData(data)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
        setShowErrorMessage(true)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      setShowErrorMessage(true)
    }
  }

  useEffect(() => {
    if (apiStatus === apiStatusConstants.success) {
      onProfileLoaded()
    }
  }, [apiStatus, onProfileLoaded])

  const renderHomeContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return <FailureView onRetry={fetchProfile} />

      case apiStatusConstants.success:
        return <Profile profileData={profileData} />

      default:
        return (
          <>
            <p className="home-page-title">Github Profile Visualizer</p>
            <img
              src="https://ik.imagekit.io/chandy/Group%202.png?updatedAt=1757601787533"
              alt="gitHub profile visualizer home page"
              className="home-image"
            />
          </>
        )
    }
  }

  return (
    <div className={`home-container ${isFailure ? 'no-center' : ''}`}>
      <div className="search-container">
        <label htmlFor="searchInput" className="visually-hidden">
          GitHub Username
        </label>

        <input
          id="searchInput"
          type="search"
          placeholder="Enter github username"
          value={inputValue}
          onChange={event => {
            setInputValue(event.target.value)
            setShowErrorMessage(false)
          }}
          className={showErrorMessage ? 'error-border' : ''}
        />

        <button
          type="button"
          data-testid="searchButton"
          onClick={fetchProfile}
          aria-label="Search"
          className="search-btn"
        >
          <HiOutlineSearch />
        </button>
      </div>

      {showErrorMessage && (
        <p className="error-message">Enter the valid github username</p>
      )}

      {renderHomeContent()}
    </div>
  )
}

export default Home
