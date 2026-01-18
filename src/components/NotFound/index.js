import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1765716309/Group_7519_qtksdp.png"
      alt="page not found"
      className="not-found-image"
    />

    <h1 className="title">PAGE NOT FOUND</h1>
    <p className="message">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="home-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
