import {useState, useContext} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'

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
  const {setUsername} = useContext(GithubContext)

  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileData, setProfileData] = useState(null)

  const fetchProfileDetails = async username => {
    setApiStatus(apiStatusConstants.loading)
    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${process.env.REACT_APP_GITHUB_API_KEY}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      setProfileData(data)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const onClickSearch = () => {
    if (searchInput !== '') {
      setUsername(searchInput)
      fetchProfileDetails(searchInput)
    }
  }

  const renderHomeView = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderView />

      case apiStatusConstants.success:
        return <Profile profileData={profileData} />

      case apiStatusConstants.failure:
        return <FailureView onRetry={() => fetchProfileDetails(searchInput)} />

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
        <input
          type="search"
          placeholder="Enter Github Username"
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />
        <button
          type="button"
          data-testid="searchButton"
          aria-label="Search"
          onClick={onClickSearch}
        >
          <HiOutlineSearch />
        </button>
      </div>

      {renderHomeView()}
    </div>
  )
}

export default Home
