import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './App'
import GithubProvider from './context/GithubProvider'

ReactDOM.render(
  <BrowserRouter>
    <GithubProvider>
      <App />
    </GithubProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
