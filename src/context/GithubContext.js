import React from 'react'

const GithubContext = React.createContext({
  username: '',
  setUsername: () => {},
})

export default GithubContext
