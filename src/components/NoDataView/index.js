import './index.css'

const NoDataView = ({imageUrl, altText, text}) => (
  <div className="no-data-container">
    <img src={imageUrl} alt={altText} className="no-data-image" />
    <p>{text}</p>
  </div>
)

export default NoDataView
