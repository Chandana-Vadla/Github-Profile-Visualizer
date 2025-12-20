import {useState} from 'react'
import GithubContext from './GithubContext'

const GithubProvider = ({children}) => {
  const [username, setUsername] = useState('')

  return (
    <GithubContext.Provider value={{username, setUsername}}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubProvider
