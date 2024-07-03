import { ToastContainer, toast } from 'react-toastify'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { clearError, selectError } from '../../redux/slices/errorSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

const Error = () => {
  const errorMessage = useAppSelector(selectError)
  const dispatch = useAppDispatch()

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
