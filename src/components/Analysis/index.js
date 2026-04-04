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
  ResponsiveContainer,
} from 'recharts'
import {Link} from 'react-router-dom'

import GITHUB_API_KEY from '../../utils/config'
import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const COLORS = ['#22c55e', '#0ea5e9', '#fbbf24', '#ef4444', '#8b5cf6']

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

  useEffect(() => {
    if (username !== '') {
      fetchAnalysis()
    }
  }, [username])

  const isNoAnalysisData = data => {
    const sum = obj =>
      Object.values(obj || {}).reduce((acc, val) => acc + val, 0)

    return (
      sum(data.quarterCommitCount) === 0 &&
      sum(data.langRepoCount) === 0 &&
      sum(data.langCommitCount) === 0 &&
      sum(data.repoCommitCount) === 0
    )
  }

  if (username === '') {
    return (
      <div className="no-username-container">
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766917027/box_rix5ib.png"
          alt="no analysis"
          className="empty-img"
        />
        <p className="message1">No Data Found</p>
        <p className="message2">
          GitHub Username is empty, please provide a valid username for analysis
        </p>

        <Link to="/">
          <button className="gotohome-button" type="button">
            Go to Home
          </button>
        </Link>
      </div>
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

  if (isNoAnalysisData(analysisData)) {
    return (
      <div className="no-analysis-container">
        <img
          src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1766915191/no_repos_m3heul.png"
          alt="no analysis"
          className="no-analysis-image"
        />
        <h1 className="no-analysis-text">No Analysis Found!</h1>
      </div>
    )
  }

  const quarterData = Object.keys(analysisData.quarterCommitCount).map(key => ({
    quarter: key,
    commits: analysisData.quarterCommitCount[key],
  }))

  const languageRepos = Object.keys(analysisData.langRepoCount).map(key => ({
    name: key,
    value: analysisData.langRepoCount[key],
  }))

  const languageCommits = Object.keys(analysisData.langCommitCount).map(
    key => ({
      name: key,
      value: analysisData.langCommitCount[key],
    }),
  )

  const commitsPerRepo = Object.keys(analysisData.repoCommitCount).map(key => ({
    name: key,
    value: analysisData.repoCommitCount[key],
  }))

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Analysis</h1>

      {/* Commits per quarter */}
      <div className="analysis-card">
        <p className="analysis-card-heading">Commits Per Quarter</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={quarterData}>
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="commits" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Two charts row */}
      <div className="analysis-row">
        <div className="analysis-card analysis-col">
          <h1 className="analysis-card-heading">Language Per Repos</h1>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={languageRepos}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
              >
                {languageRepos.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="analysis-card analysis-col">
          <h1 className="analysis-card-heading">Language Per Commits</h1>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={languageCommits}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
              >
                {languageCommits.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Commits per repo */}
      <div className="analysis-card">
        <h1 className="analysis-card-heading">Commits Per Repo (Top 10)</h1>

        <div className="repo-chart-wrapper">
          <PieChart width={260} height={260}>
            <Pie
              data={commitsPerRepo}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
            >
              {commitsPerRepo.map(item => (
                <Cell
                  key={item.name}
                  fill={COLORS[item.name.length % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          <ul className="repo-legend">
            {commitsPerRepo.map((item, index) => (
              <li key={item.name}>
                <span
                  className="legend-dot"
                  style={{backgroundColor: COLORS[index % COLORS.length]}}
                />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Analysis
