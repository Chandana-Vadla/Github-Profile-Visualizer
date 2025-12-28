import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <header>
    <nav>
      <Link className="heading" to="/">
        <h1>GitHub Profile Visualizer</h1>
      </Link>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/repositories">Repositories</Link>
        </li>
        <li>
          <Link to="/analysis">Analysis</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
