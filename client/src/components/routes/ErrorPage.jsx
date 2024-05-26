import { useRouteError, Link } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Ой!</h1>
      <p>Такой страницы нет</p>
      <Link to="/">Перейти на главную</Link>
    </div>
  )
}
export default ErrorPage
