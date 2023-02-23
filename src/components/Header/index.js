import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

const Header = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <div className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-img"
          />
        </Link>
        <div>
          <ul className="list-cont">
            <li>
              <Link to="/" className="header-head-1">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="header-head-1">
                Jobs
              </Link>
            </li>
          </ul>
        </div>
        <button type="button" className="header-butt" onClick={logoutButton}>
          Logout
        </button>
      </div>
      <div className="header-container-card-1">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-img"
          />
        </Link>
        <div>
          <ul className="list-cont">
            <Link to="/" className="header-head-1">
              <li>
                <AiFillHome className="icon-1" />
              </li>
            </Link>

            <li>
              <Link to="/jobs" className="header-head-1">
                <BsFillBriefcaseFill className="icon-1" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="header-l-butt header-head-1"
                onClick={logoutButton}
              >
                <FiLogOut className="icon-1" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default withRouter(Header)
