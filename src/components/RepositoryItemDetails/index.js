import {useEffect, useState, useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PieChart, Pie, Cell, Legend} from 'recharts'

import GithubContext from '../../context/GithubContext'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import GITHUB_API_KEY from '../../utils/config'
import './index.css'

const RepositoryItemDetails = () => {
  const {username} = useContext(GithubContext)
  const {repoName} = useParams()

  const [repoDetails, setRepoDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState('')

  const fetchRepoDetails = async () => {
    setApiStatus('LOADING')
    const apiUrl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=${GITHUB_API_KEY}`
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
  }, [])

  if (apiStatus === 'LOADING') return <LoaderView />
  if (apiStatus === 'FAILURE') return <FailureView onRetry={fetchRepoDetails} />
  if (!repoDetails) return null

  const {
    name,
    description,
    stargazers_count: stargazersCount,
    forks_count: forksCount,
    open_issues_count: openIssuesCount,
    topics,
    contributors,
    lanuages,
  } = repoDetails

  const totalCommits = contributors.reduce(
    (total, c) => total + (c.contributions || 0),
    0,
  )

  const COLORS = ['#22c55e', '#0ea5e9', '#eab308', '#f43f5e', '#a855f7']

  return (
    <div className="repo-details-wrapper">
      <div className="repo-card">
        <h1 className="repo-title">{name}</h1>
        <p className="repo-desc">{description}</p>

        <div className="topics-container">
          {topics &&
            topics.length > 0 &&
            topics.map(topic => (
              <span key={topic} className="topic-chip">
                {topic}
              </span>
            ))}
        </div>

        <div className="repo-stats-icons">
          <span>⭐ {stargazersCount}</span>
          <span>🍴 {forksCount}</span>
          <span>🐞 {openIssuesCount}</span>
        </div>

        <div className="stats-row">
          <div className="repo-stats-box">
            <p className="box-title">Commits Count</p>
            <h3>{totalCommits}</h3>
          </div>

          <div className="repo-stats-box">
            <h2 className="box-title">Issues Count</h2>
            <h3>{openIssuesCount}</h3>
          </div>
        </div>

        <h2 className="section-title">Contributors :</h2>
        <p className="members">{contributors.length} Members</p>

        <div className="contributors-row">
          {contributors.slice(0, 5).map(c => (
            <img
              key={c.id}
              src={c.avatar_url}
              alt="contributor"
              className="avatar"
            />
          ))}
          {contributors.length > 5 && (
            <div className="avatar more">+{contributors.length - 5}</div>
          )}
        </div>

        <div className="languages-section">
          <h2 className="section-title">Languages :</h2>

          <div className="chart-row">
            <PieChart width={260} height={260}>
              <Pie
                data={lanuages}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
              >
                {lanuages.map(lang => (
                  <Cell
                    key={lang.name}
                    fill={COLORS[lanuages.indexOf(lang) % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>

            <ul className="language-list">
              {lanuages.map(lang => (
                <li key={lang.name}>
                  <span
                    className="lang-color-dot"
                    style={{
                      backgroundColor:
                        COLORS[lanuages.indexOf(lang) % COLORS.length],
                    }}
                  />
                  {lang.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItemDetails
