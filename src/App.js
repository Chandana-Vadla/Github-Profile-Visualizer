import {Switch, Route, useLocation} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Repositories from './components/Repositories'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  const location = useLocation()

  // Hide header ONLY on Home route (small devices via CSS)
  const hideHeaderOnMobileHome = location.pathname === '/'

  return (
    <div
      className={`app-container ${
        hideHeaderOnMobileHome ? 'hide-header-mobile' : ''
      }`}
    >
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
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
