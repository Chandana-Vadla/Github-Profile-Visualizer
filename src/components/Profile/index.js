/* eslint-disable camelcase */

import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'

import './index.css'

const Profile = ({profileData}) => {
  const {
    avatar_url,
    name,
    login,
    bio,
    company,
    blog,
    location,
    followers,
    following,
    public_repos,
  } = profileData
  const avatarUrl = avatar_url
  const publicRepos = public_repos

  return (
    <div className="profile-container">
      <img src={avatarUrl} alt={name} className="profile-image" />

      <h1>{name}</h1>
      <p>@{login}</p>
      <h2>BIO</h2>
      {bio && <p>{bio}</p>}
      <ul className="profile-stats">
        <li>
          <p>{followers}</p>
          <p>FOLLOWERS</p>
        </li>
        <li>
          <p>{following}</p>
          <p>FOLLOWING</p>
        </li>
        <li>
          <p>{publicRepos}</p>
          <p>PUBLIC REPOS</p>
        </li>
      </ul>

      <ul className="profile-details">
        {company && (
          <li>
            <p>Company</p>
            <div>
              <RiBuildingLine />
              <p>{company}</p>
            </div>
          </li>
        )}
        {location && (
          <li>
            <p>Location</p>
            <div>
              <IoLocationOutline />
              <p>{location}</p>
            </div>
          </li>
        )}
        {blog && (
          <li>
            <p>Blog</p>
            <div>
              <IoMdLink />
              <p>{blog}</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Profile
