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

  const {setUsername} = useContext(GithubContext)

  const fetchProfile = async () => {
    if (inputValue.trim() === '') {
      return
    }

    setUsername(inputValue) // ✅ store username globally
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
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  // ✅ Notify App.js when profile is successfully loaded
  useEffect(() => {
    if (apiStatus === apiStatusConstants.success) {
      onProfileLoaded()
    }
  }, [apiStatus, onProfileLoaded])

  const renderHomeContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView />

      case apiStatusConstants.success:
        return <Profile profileData={profileData} />

      case apiStatusConstants.failure:
        return <FailureView onRetry={fetchProfile} />

      default:
        return (
          <img
            src="https://ik.imagekit.io/chandy/Group%202.png?updatedAt=1757601787533"
            alt="github profile visualizer home page"
            className="home-image"
          />
        )
    }
  }

  return (
    <div className="home-container">
      <div className="search-container">
        {/* Accessibility label (hidden visually) */}
        <label htmlFor="searchInput" className="visually-hidden">
          GitHub Username
        </label>

        <input
          id="searchInput"
          type="search"
          placeholder="Enter GitHub username"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />

        <button
          type="button"
          data-testid="searchButton"
          onClick={fetchProfile}
          aria-label="Search"
        >
          <HiOutlineSearch />
        </button>
      </div>

      {renderHomeContent()}
    </div>
  )
}

export default Home
