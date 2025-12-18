import Loader from 'react-loader-spinner'

const LoaderView = () => (
  <div data-testid="loader">
    <Loader type="TailSpin" color="#4f8cff" height={50} width={50} />
  </div>
)

export default LoaderView
