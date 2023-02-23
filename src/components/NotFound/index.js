import './index.css'

import Header from '../Header'

const NotFound = () => (
  <div className="nf-cont">
    <Header />
    <div className="nf-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="nf-img"
      />
      <h1 className="nf-heading">Page Not Found</h1>
      <p className="nf-para">
        were sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
