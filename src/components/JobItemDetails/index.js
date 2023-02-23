import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemList: [],
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobItemList()
  }

  getJobItemList = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {similarJobs} = fetchedData
      const similarJobsFetchedData = similarJobs.map(e => ({
        title: e.title,
        rating: e.rating,
        location: e.location,
        id: e.id,
        jobDescription: e.job_description,
        employmentType: e.employment_type,
        companyLogoUrl: e.company_logo_url,
      }))
      const {jobDetails} = fetchedData
      const jobDetailsFetchedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        packagePerAnnum: jobDetails.package_per_annum,
        skills: jobDetails.skills.map(ei => ({
          name: ei.name,
          imageUrl: ei.image_url,
        })),
      }
      console.log(jobDetailsFetchedData)
      this.setState({jobItemList: jobDetailsFetchedData})
      this.setState({similarJobsList: similarJobsFetchedData})
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {similarJobsList, jobItemList} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      title,
      rating,
      location,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobItemList
    return (
      <div className="success-jid-cont">
        <div className="ji-list-item">
          <div className="card-1-jid">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-jid-img"
            />
            <div className="inner-card-j-jid">
              <h1 className="p-1-jid">{title}</h1>
              <div className="inner-2-card-1-jid">
                <div className="div-icon-jid">
                  <AiFillStar className="icon-jid" />
                </div>
                <p className="p-1-jid">{rating}</p>
              </div>
            </div>
          </div>
          <div className="card-2-jid">
            <div className="card-2-inner-jid">
              <div className="div-icon-1-jid">
                <MdLocationOn className="icon-jid" />
              </div>
              <p className="loc-jid">{location}</p>
              <div className="div-icon-1-jid">
                <BsFillBriefcaseFill className="icon-jid" />
              </div>
              <p className="loc-jid">{employmentType}</p>
            </div>
            <p className="lpa-jid">{packagePerAnnum}</p>
          </div>
          <hr className="hr-jid" />
          <div className="des-cont-jid">
            <h1 className="des-jid">Description</h1>
            <div className="a-jid-link">
              <a href={companyWebsiteUrl} target="_click" className="anchor-el">
                Visit
              </a>
              <div className="ex-link">
                <BiLinkExternal />
              </div>
            </div>
          </div>
          <p className="des-2-jid">{jobDescription}</p>
          <h1 className="des-jid">Skills</h1>
          <ul className="jid-s-link">
            {skills.map(e => (
              <li key={e.name} className="list-item-jid-s">
                <img src={e.imageUrl} alt={e.name} className="lis-img" />
                <p className="lis-par">{e.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="des-jid">Life at Company</h1>
          <div className="life">
            <p className="des-2-jid-2">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-img"
            />
          </div>
        </div>
        <h1 className="des-jid-l">Similar Jobs</h1>
        <ul className="l-cont-s">
          {similarJobsList.map(e => (
            <SimilarJobItem key={e.id} jobItem={e} />
          ))}
        </ul>
      </div>
    )
  }

  jobsDetailsFailureButton = () => {
    this.getJobItemList()
  }

  renderLoadingView = () => (
    <div className="loader-container-jid" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="loader-container-jid">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="j-failure-jid-img"
      />
      <h1 className="j-failure-jid-head">Oops! Something Went Wrong</h1>
      <p className="j-failure-jid-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="j-failure-jid-butt"
        onClick={this.jobsDetailsFailureButton}
      >
        Retry
      </button>
    </div>
  )

  allMethodsOfJobItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jid-container">
        <Header />
        {this.allMethodsOfJobItems()}
      </div>
    )
  }
}

export default JobItemDetails
