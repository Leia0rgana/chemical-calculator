import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Menu from './components/UI/Menu'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/routes/ErrorPage.jsx'
import ElemetList from './components/routes/ElemetList.jsx'
import Element from './components/routes/Element.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'element-list',
        element: <ElemetList />,
      },
      {
        path: 'element-list/:number',
        element: <Element />,
      },
    ],
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
