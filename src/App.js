import {Switch, Route, useLocation} from 'react-router-dom'
import {useState} from 'react'

import Header from './components/Header'
import Home from './components/Home'
import Repositories from './components/Repositories'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  const location = useLocation()
  const [isProfileVisible, setIsProfileVisible] = useState(false)

  const hideHeaderOnMobile = location.pathname === '/' && !isProfileVisible

  return (
    <div
      className={`app-container ${
        hideHeaderOnMobile ? 'hide-header-mobile' : ''
      }`}
    >
      <Header />

      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home onProfileLoaded={() => setIsProfileVisible(true)} />
          )}
        />
        <Route exact path="/repositories" component={Repositories} />
        <Route
          exact
          path="/repositories/:repoName"
          component={RepositoryItemDetails}
        />
        <Route exact path="/analysis" component={Analysis} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
