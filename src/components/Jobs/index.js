import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    searchValue: '',
    empTypeList: [],
    salaryRange: '',
    jobsList: [],
    apiStatus: apiConstantStatus.initial,
    search: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = {
        profileDetails: data.profile_details,
      }
      const {profileDetails} = fetchedData
      const profileObject = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profileDetails: profileObject})
      this.setState({profileStatus: true})
    }
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiConstantStatus.progress})
    const {empTypeList, salaryRange, search} = this.state
    console.log(search)
    const empTypeString = empTypeList.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${empTypeString}&minimum_package=${salaryRange}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const fetchedJobs = jobs.map(e => ({
        id: e.id,
        location: e.location,
        rating: e.rating,
        title: e.title,
        packagePerAnnum: e.package_per_annum,
        jobDescription: e.job_description,
        employmentType: e.employment_type,
        companyLogoUrl: e.company_logo_url,
      }))
      this.setState({jobsList: fetchedJobs})
      this.setState({apiStatus: apiConstantStatus.success})
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  searchValueFunction = event => {
    this.setState({searchValue: event.target.value})
  }

  salaryRangeFunction = event => {
    this.setState({salaryRange: event.target.id}, this.getJobsList)
  }

  checkboxFunction = event => {
    console.log(event.target.id)
    const {empTypeList} = this.state
    const resultCheckInputs = empTypeList.filter(e => e === event.target.id)
    const res = resultCheckInputs.length
    if (res === 0) {
      this.setState(
        prevState => ({
          empTypeList: [...prevState.empTypeList, event.target.id],
        }),
        this.getJobsList,
      )
    } else {
      const res2 = empTypeList.filter(e => e !== event.target.id)
      this.setState({empTypeList: res2}, this.getJobsList)
    }
  }

  renderSuccessProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <>
        <div className="profile-success">
          <img
            src={profileImageUrl}
            alt="profile"
            className="profile-img-jobs"
          />
          <h1 className="head-jps">{name}</h1>
          <p className="para-jps">{shortBio}</p>
        </div>
      </>
    )
  }

  profileFailureButton = () => {
    this.getProfileDetails()
  }

  renderFailureProfileView = () => (
    <div className="profile-failure">
      <button
        type="button"
        className="home-butt"
        onClick={this.profileFailureButton}
      >
        Retry
      </button>
    </div>
  )

  jobsFailureButton = () => {
    this.getJobsList()
  }

  jobFailureStyle = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="j-failure-job-img"
      />
      <h1 className="j-failure-j-head">Oops! Something Went Wrong</h1>
      <p className="j-failure-j-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="j-failure-j-butt"
        onClick={this.jobsFailureButton}
      >
        Retry
      </button>
    </div>
  )

  jobRenderStyle = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobSuccessStyle = () => {
    const {jobsList} = this.state
    const len = jobsList.length === 0
    if (len === false) {
      return (
        <div>
          <ul className="j-success-jobs-cont">
            {jobsList.map(e => (
              <JobItem key={e.id} jobs={e} />
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className="failure-job">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="j-no-job-img"
        />
        <h1 className="j-failure-j-head">No Jobs Found</h1>
        <p className="j-failure-j-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  alLMethods = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.jobSuccessStyle()
      case apiConstantStatus.failure:
        return this.jobFailureStyle()
      case apiConstantStatus.progress:
        return this.jobRenderStyle()
      default:
        return null
    }
  }

  onEnterSearchInput = event => {
    const {searchValue} = this.state
    if (event.key === 'Enter') {
      this.setState({search: searchValue}, this.getJobsList)
    }
  }

  searchButt = () => {
    const {searchValue} = this.state
    console.log(searchValue)
    this.setState({search: searchValue}, this.getJobsList)
  }

  render() {
    const {profileStatus} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-card-1">
          <div className="s-sm">
            <input
              type="search"
              className="search-j"
              onChange={this.searchValueFunction}
              placeholder="Search"
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              type="button"
              className="butt"
              onClick={this.searchButt}
              testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div className="card-1-inner-1-container">
            {profileStatus
              ? this.renderSuccessProfileView()
              : this.renderFailureProfileView()}
            <hr className="hr-line" />
            <h1 className="head-check-j">Type of Employment</h1>
            <ul className="jobs-list-cont">
              {employmentTypesList.map(e => (
                <li className="check-j-list" key={e.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={e.employmentTypeId}
                    onChange={this.checkboxFunction}
                  />
                  <label htmlFor={e.employmentTypeId} className="label-text">
                    {e.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="hr-line" />
            <h1 className="head-check-j">Salary Range</h1>
            <ul className="jobs-list-cont">
              {salaryRangesList.map(e => (
                <li className="check-j-list" key={e.salaryRangeId}>
                  <input
                    type="radio"
                    id={e.salaryRangeId}
                    name="uday"
                    onChange={this.salaryRangeFunction}
                  />
                  <label htmlFor={e.salaryRangeId} className="label-text">
                    {e.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-1-inner-2-container">
            <div className="j-search-cont">
              <input
                type="search"
                className="search-j"
                onChange={this.searchValueFunction}
                placeholder="Search"
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="butt"
                onClick={this.searchButt}
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.alLMethods()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
