import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useState} from 'react'

import GithubContext from './context/GithubContext'
import Header from './components/Header'
import Home from './components/Home'
import Repositories from './components/Repositories'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'

const App = () => {
  const [username, setUsername] = useState('')

  return (
    <GithubContext.Provider value={{username, setUsername}}>
      <BrowserRouter>
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
      </BrowserRouter>
    </GithubContext.Provider>
  )
}

export default App
