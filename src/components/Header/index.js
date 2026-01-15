import {useState} from 'react'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header>
      <div className="header-top">
        <Link className="heading" to="/">
          <h1>GitHub Profile Visualizer</h1>
        </Link>

        {/* Hamburger icon – visible only on small devices */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setShowMenu(prev => !prev)}
          aria-label="menu"
        >
          <GiHamburgerMenu size={24} />
        </button>
        {/* Nav items – ALWAYS in DOM */}
        <ul className={`nav-items ${showMenu ? 'show' : ''}`}>
          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/repositories" onClick={() => setShowMenu(false)}>
              Repositories
            </Link>
          </li>
          <li>
            <Link to="/analysis" onClick={() => setShowMenu(false)}>
              Analysis
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
