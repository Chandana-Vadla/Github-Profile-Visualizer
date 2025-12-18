/* eslint-disable camelcase */
import './index.css'

const Profile = ({profileData}) => {
  const {
    avatar_url,
    name,
    login,
    bio,
    followers,
    following,
    public_repos,
    company,
    location,
    blog,
  } = profileData

  return (
    <div className="profile-card">
      <img src={avatar_url} alt={name} className="profile-avatar" />

      <h1 className="profile-name">{name}</h1>
      <p className="profile-username">@{login}</p>

      {bio && <p className="profile-bio">{bio}</p>}

      <div className="profile-stats">
        <div className="stat-item">
          <p className="stat-value">{followers}</p>
          <p className="stat-label">Followers</p>
        </div>

        <div className="stat-item">
          <p className="stat-value">{following}</p>
          <p className="stat-label">Following</p>
        </div>

        <div className="stat-item">
          <p className="stat-value">{public_repos}</p>
          <p className="stat-label">Public Repos</p>
        </div>
      </div>

      <div className="profile-extra">
        {company && <p>{company}</p>}
        {location && <p>{location}</p>}
        {blog && (
          <a href={blog} target="_blank" rel="noreferrer">
            {blog}
          </a>
        )}
      </div>
    </div>
  )
}

export default Profile
