import './index.css'

const FailureView = props => {
  const {onRetry} = props

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dgsdoqhph/image/upload/v1765715565/Group_7522_rtngop.png"
        alt="failure view"
        className="failure-image"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
