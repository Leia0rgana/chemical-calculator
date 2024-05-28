import { useRouteError, Link } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div className="errorPage">
      <h1>Ой! Что-то пошло не так</h1>
      {error && (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      )}
      <Link to="/">Перейти на главную</Link>
    </div>
  )
}
export default ErrorPage
