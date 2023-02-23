import './index.css'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    title,
    rating,
    location,
    id,
  } = jobs
  return (
    <>
      <Link to={`jobs/${id}`} className="link-ji">
        <li className="ji-list-item">
          <div className="card-1-ji">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-ji-img"
            />
            <div className="inner-card-j-ji">
              <h1 className="p-1-ji">{title}</h1>
              <div className="inner-2-card-1-ji">
                <div className="div-icon">
                  <AiFillStar className="icon-ji" />
                </div>
                <p className="p-1-ji">{rating}</p>
              </div>
            </div>
          </div>
          <div className="card-2-ji">
            <div className="card-2-inner-ji">
              <div className="div-icon-1">
                <MdLocationOn className="icon-ji" />
              </div>
              <p className="loc-ji">{location}</p>
              <div className="div-icon-1">
                <BsFillBriefcaseFill className="icon-ji" />
              </div>
              <p className="loc-ji">{employmentType}</p>
            </div>
            <p className="lpa-ji">{packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <h1 className="des-ji">Description</h1>
          <p className="des-2-ji">{jobDescription}</p>
        </li>
      </Link>
    </>
  )
}

export default JobItem
