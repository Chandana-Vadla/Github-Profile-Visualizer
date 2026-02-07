import {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setShowMenu(false)
  }, [location.pathname])

  const isActive = path => location.pathname === path

  return (
    <header>
      {/* TOP BAR */}
      <div className="header-top">
        <Link className="heading" to="/">
          <h1>GitHub Profile Visualizer</h1>
        </Link>

        {/* Desktop nav */}
        <ul className="nav-items desktop-nav">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/repositories"
              className={isActive('/repositories') ? 'active' : ''}
            >
              Repositories
            </Link>
          </li>
          <li>
            <Link
              to="/analysis"
              className={isActive('/analysis') ? 'active' : ''}
            >
              Analysis
            </Link>
          </li>
        </ul>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setShowMenu(prev => !prev)}
          aria-label="menu"
        >
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {/* Mobile nav */}
      <ul className={`nav-items mobile-nav ${showMenu ? 'show' : ''}`}>
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/repositories"
            className={isActive('/repositories') ? 'active' : ''}
          >
            Repositories
          </Link>
        </li>
        <li>
          <Link
            to="/analysis"
            className={isActive('/analysis') ? 'active' : ''}
          >
            Analysis
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
