import { useRouteError, Link } from 'react-router-dom'

interface IRouteError {
  statusText?: string
  message?: string
}

const ErrorPage = () => {
  const error = useRouteError() as IRouteError
  return (
    <div className="errorPage">
      <h1>Ой! Что-то пошло не так</h1>
      {error && (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      )}
      <Link to="/" style={{ textDecoration: 'underline', color: '#5CC4E0' }}>
        Перейти на главную
      </Link>
    </div>
  )
}
export default ErrorPage
