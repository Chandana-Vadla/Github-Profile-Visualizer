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

  if (username === '') {
    return (
      <div className="empty-page">
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

      {/* Commits Per Quarter */}
      <div className="analysis-card">
        <h1 className="analysis-card-title">Commits Per Quarter</h1>
        <LineChart width={800} height={300} data={quarterData}>
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="commits" stroke="#3b82f6" />
        </LineChart>
      </div>

      {/* TWO CARDS ROW */}
      <div className="analysis-row">
        {/* LANGUAGE PER REPO */}
        <div className="analysis-card analysis-col">
          <h1 className="analysis-card-title">Repos Per Language</h1>
          <PieChart width={300} height={260}>
            <Pie
              data={languageRepos}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
            >
              {languageRepos.map((_, idx) => (
                <Cell
                  key={languageRepos[idx].name}
                  fill={COLORS[idx % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </div>

        {/* LANGUAGE PER COMMITS */}
        <div className="analysis-card analysis-col">
          <h1 className="analysis-card-title">Commits Per Language</h1>
          <PieChart width={300} height={260}>
            <Pie
              data={languageCommits}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
            >
              {languageCommits.map((_, idx) => (
                <Cell
                  key={languageCommits[idx].name}
                  fill={COLORS[idx % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </div>
      </div>

      {/* COMMITS PER REPO */}
      <div className="analysis-card">
        <h1 className="analysis-card-title">Commits Per Repo (Top 10)</h1>
        <PieChart width={350} height={300}>
          <Pie
            data={commitsPerRepo}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
          >
            {commitsPerRepo.map((_, idx) => (
              <Cell
                key={commitsPerRepo[idx].name}
                fill={COLORS[idx % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}

export default Analysis
