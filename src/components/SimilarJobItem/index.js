import './index.css'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {jobItem} = props
  const {
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = jobItem
  return (
    <li className="similar-jdi-cont-list">
      <div className="card-1-ji">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="des-s-jid">Description</h1>
      <p className="des-2-s-jid">{jobDescription}</p>
      <div className="card-2-inner-s-jid">
        <div className="div-icon-1-jid">
          <MdLocationOn className="icon-jid" />
        </div>
        <p className="loc-jid">{location}</p>
        <div className="div-icon-1-jid">
          <BsFillBriefcaseFill className="icon-jid" />
        </div>
        <p className="loc-jid">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
