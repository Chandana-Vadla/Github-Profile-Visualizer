// import {Component} from 'react'
// import {HiOutlineSearch} from 'react-icons/hi'
// import Loader from 'react-loader-spinner'
// import Home from '../Home'
// import GITHUB_API_KEY from '../../utils/config'

// import './index.css'

// console.log('Home import:', Home)

// class Landingpage extends Component {
//   isComponentMounted = false

//   state = {
//     inputUsername: '',
//     profileDetails: {},
//     isLoading: false,
//     isResponseSuccess: false,
//     fetchError: false,
//   }

//   componentDidMount() {
//     this.isComponentMounted = true
//   }

//   componentWillUnmount() {
//     this.isComponentMounted = false
//   }

//   onUsernameChange = event => {
//     this.setState({
//       inputUsername: event.target.value,
//     })
//   }

//   fetchUserDetails = async inputUsername => {
//     if (!this.isComponentMounted) return
//     this.setState({
//       isLoading: true,
//     })

//     const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${inputUsername}?api_key=${GITHUB_API_KEY}`
//     try {
//       const response = await fetch(apiUrl)
//       if (!this.isComponentMounted) return
//       if (response.ok) {
//         const data = await response.json()
//         const updateData = {
//           avatarUrl: data.avatar_url,
//           bio: data.bio,
//           blog: data.blog,
//           company: data.company,
//           createdAt: data.created_at,
//           email: data.email,
//           eventsUrl: data.events_url,
//           followers: data.followers,
//           followersUrl: data.followers_url,
//           following: data.following,
//           followingUrl: data.following_url,
//           gistsUrl: data.gists_url,
//           gravatarId: data.gravatar_id,
//           hireable: data.hireable,
//           htmlUrl: data.html_url,
//           id: data.id,
//           location: data.location,
//           login: data.login,
//           name: data.name,
//           nodeId: data.node_id,
//           organizationsUrl: data.organizations_url,
//           publicGists: data.public_gists,
//           publicRepos: data.public_repos,
//           receivedEventsUrl: data.received_events_url,
//           reposUrl: data.repos_url,
//           siteAdmin: data.site_admin,
//           starredUrl: data.starred_url,
//           subscriptionsUrl: data.subscriptions_url,
//           twitterUsername: data.twitter_username,
//           type: data.type,
//           updated_at: data.updated_at,
//           url: data.url,
//         }

//         if (this.isComponentMounted) {
//           this.setState({
//             profileDetails: updateData,
//             isLoading: false,
//             isResponseSuccess: true,
//           })
//         }
//       } else if (this.isComponentMounted) {
//         this.setState({isLoading: false, fetchError: true})
//       }
//     } catch (error) {
//       if (this.isComponentMounted) {
//         this.setState({isLoading: false, fetchError: true})
//       }
//     }
//   }

//   onSearchBtnClick = () => {
//     const {inputUsername} = this.state
//     this.fetchUserDetails(inputUsername)
//   }

//   displayLoader = () => (
//     <div className="loader-container" data-testid="loader">
//       <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
//     </div>
//   )

//   render() {
//     const {
//       inputUsername,
//       isResponseSuccess,
//       fetchError,
//       isLoading,
//       profileDetails,
//     } = this.state

//     if (isLoading) {
//       return this.displayLoader()
//     }

//     if (isResponseSuccess) {
//       return <Home profileDetails={profileDetails} />
//     }

//     return (
//       <div className="landingpage-container">
//         <div className="search-container">
//           <input
//             onChange={this.onUsernameChange}
//             value={inputUsername}
//             className="search-bar"
//             type="search"
//             placeholder="Enter github username"
//           />
//           <button
//             aria-label="search button"
//             className="search-icon"
//             type="button"
//             data-testid="searchButton"
//             onClick={this.onSearchBtnClick}
//           >
//             <HiOutlineSearch />
//           </button>
//         </div>
//         <p className="heading">Github Profile Visualizer</p>
//         <div>
//           {fetchError ? (
//             <div className="error-view">
//               <img
//                 src="https://ik.imagekit.io/chandy/Group%207522.png?updatedAt=1757679230893"
//                 alt="error"
//               />
//               <p>Something went wrong. Please try again</p>
//               <button type="button" onClick={this.onSearchBtnClick}>
//                 Try again
//               </button>
//             </div>
//           ) : (
//             <img
//               src="https://ik.imagekit.io/chandy/Group%202.png?updatedAt=1757601787533"
//               className="img"
//               alt="landing visual"
//             />
//           )}
//         </div>
//       </div>
//     )
//   }
// }

// export default Landingpage
