import {useEffect, useState, useContext} from 'react'
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

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#a855f7', '#ef4444']

const Analysis = () => {
  const {username} = useContext(GithubContext)

  const [analysisData, setAnalysisData] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

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

  useEffect(() => {
    if (username !== '') {
      fetchAnalysis()
    }
    // eslint-disable-next-line
  }, [username])

  const getQuarterCommitData = () =>
    Object.keys(analysisData.quarterCommitCount).map(key => ({
      quarter: key,
      commits: analysisData.quarterCommitCount[key],
    }))

  const getLanguageRepoData = () =>
    Object.keys(analysisData.langRepoCount).map(key => ({
      name: key,
      value: analysisData.langRepoCount[key],
    }))

  const renderAnalysisView = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <LoaderView />

      case apiStatusConstants.failure:
        return <FailureView onRetry={fetchAnalysis} />

      case apiStatusConstants.success:
        if (getLanguageRepoData().length === 0) {
          return (
            <div className="no-data-container">
              <img
                src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1765715812/Layer_3_nzotlx.png"
                alt="no analysis"
                className="no-data-image"
              />
              <h1 className="no-data-title">No Analysis Found!</h1>
            </div>
          )
        }

        return (
          <div className="analysis-container">
            <h1 className="analysis-title">Analysis</h1>

            {/* Commits per Quarter */}
            <div className="analysis-card">
              <h1 className="analysis-card-title">Commits Per Quarter</h1>
              <LineChart width={900} height={300} data={getQuarterCommitData()}>
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="commits" stroke="#3b82f6" />
              </LineChart>
            </div>

            {/* Language Repo Count */}
            <div className="analysis-card">
              <h1 className="analysis-card-title">Repositories Per Language</h1>
              <PieChart width={400} height={300}>
                <Pie
                  data={getLanguageRepoData()}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {getLanguageRepoData().map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </div>
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
          alt="empty analysis"
          className="no-data-image"
        />
        <h1 className="no-data-title">No Data Found</h1>
      </div>
    )
  }

  return renderAnalysisView()
}

export default Analysis
