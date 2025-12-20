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

  return (
    <div className="profile-container">
      <img src={avatar_url} alt={name} className="profile-image" />

      <h1>{name}</h1>
      <p>@{login}</p>
      {bio && <p>{bio}</p>}

      <ul className="profile-stats">
        <li>
          <p>{followers}</p>
          <p>Followers</p>
        </li>
        <li>
          <p>{following}</p>
          <p>Following</p>
        </li>
        <li>
          <p>{public_repos}</p>
          <p>Public Repos</p>
        </li>
      </ul>

      <ul className="profile-details">
        {company && (
          <li>
            <RiBuildingLine />
            <p>{company}</p>
          </li>
        )}
        {blog && (
          <li>
            <IoMdLink />
            <a href={blog}>{blog}</a>
          </li>
        )}
        {location && (
          <li>
            <IoLocationOutline />
            <p>{location}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Profile
