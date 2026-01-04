import {createContext} from 'react'

const GithubContext = createContext({
  username: '',
  setUsername: () => {},
})

export default GithubContext
