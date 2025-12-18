import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

const Header = props => {
  const {location} = props
  const [showMenu, setShowMenu] = useState(false)

  const isActive = path => location.pathname === path

  return (
    <nav className="header">
      <Link to="/" className="logo">
        Github Profile Visualizer
      </Link>

      <div className={`nav-links ${showMenu ? 'mobile-show' : ''}`}>
        <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
          Home
        </Link>
        <Link
          className={`nav-link ${isActive('/repositories') ? 'active' : ''}`}
          to="/repositories"
        >
          Repositories
        </Link>
        <Link
          className={`nav-link ${isActive('/analysis') ? 'active' : ''}`}
          to="/analysis"
        >
          Analysis
        </Link>
      </div>

      <GiHamburgerMenu
        className="hamburger"
        onClick={() => setShowMenu(prev => !prev)}
      />
    </nav>
  )
}

export default withRouter(Header)
