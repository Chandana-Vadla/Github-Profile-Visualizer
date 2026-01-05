import {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import GITHUB_API_KEY from '../../utils/config'
import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Analysis = () => {
  const {username} = useContext(GithubContext)

  const [analysisData, setAnalysisData] = useState(null)
  const [apiStatus, setApiStatus] = useState('')

  const fetchAnalysis = async () => {
    setApiStatus(apiStatusConstants.loading)

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=${GITHUB_API_KEY}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      setAnalysisData(data)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  // ✅ FIX: depend on username
  useEffect(() => {
    if (username !== '') {
      fetchAnalysis()
    }
  }, [username])

  if (username === '') {
    return (
      <>
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766917027/box_rix5ib.png"
          alt="empty analysis"
        />
        <p>No Data Found</p>
        <p>
          GitHub Username is empty, please provide a valid username for analysis
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
    return <FailureView onRetry={fetchAnalysis} />
  }

  if (!analysisData) {
    return null
  }

  const quarterData = Object.keys(analysisData.quarterCommitCount).map(key => ({
    quarter: key,
    commits: analysisData.quarterCommitCount[key],
  }))

  const languageData = Object.keys(analysisData.langRepoCount).map(key => ({
    name: key,
    value: analysisData.langRepoCount[key],
  }))

  return (
    <div>
      <h1>Analysis</h1>

      <h1>Commits Per Quarter</h1>
      <LineChart width={800} height={300} data={quarterData}>
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="commits" />
      </LineChart>

      <h1>Languages</h1>
      <PieChart width={400} height={300}>
        <Pie data={languageData} dataKey="value">
          {languageData.map(item => (
            <Cell key={item.name} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  )
}

export default Analysis
