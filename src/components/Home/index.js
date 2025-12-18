import {useState, useEffect, useContext} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import GITHUB_API_KEY from '../../utils/config'

import GithubContext from '../../context/GithubContext'
import Profile from '../Profile'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const {username, setUsername} = useContext(GithubContext)

  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileData, setProfileData] = useState(null)
  const [showError, setShowError] = useState(false)

  // ✅ MOVE THIS ABOVE useEffect
  const fetchProfile = async () => {
    setApiStatus(apiStatusConstants.loading)

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${GITHUB_API_KEY}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      setProfileData(data)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    if (username !== '') {
      fetchProfile()
    }
    // eslint-disable-next-line
  }, [username])

  const onClickSearch = () => {
    if (searchInput === '') {
      setShowError(true)
    } else {
      setShowError(false)
      setUsername(searchInput)
    }
  }

  const renderHomeView = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderView />
      case apiStatusConstants.success:
        return <Profile profileData={profileData} />
      case apiStatusConstants.failure:
        return <FailureView onRetry={fetchProfile} />
      default:
        return (
          <img
            src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1765713178/Group_2_rd6reu.png"
            alt="github profile visualizer home page"
            className="home-image"
          />
        )
    }
  }

  return (
    <div className="home-container">
      <div className="search-container">
        <label className="search-label">
          Search Github Username
          <div className="search-box">
            <input
              type="search"
              className="search-input"
              placeholder="Enter Github Username"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />

            <button
              type="button"
              className="search-button"
              data-testid="searchButton"
              aria-label="Search Github Username"
              onClick={onClickSearch}
            >
              <HiOutlineSearch size={20} />
            </button>
          </div>
        </label>

        {showError && (
          <p className="search-error">Enter the valid github username</p>
        )}
      </div>

      {renderHomeView()}
    </div>
  )
}

export default Home
