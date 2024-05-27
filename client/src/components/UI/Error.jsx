import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, selectError } from '../../redux/slices/errorSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

const Error = () => {
  const errorMessage = useSelector(selectError)
  const dispatch = useDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(clearError())
    }
  }, [errorMessage, dispatch])

  return (
    <ToastContainer
      closeOnClick
      position="top-right"
      autoClose={2000}
      theme="colored"
    />
  )
}

export default Error
