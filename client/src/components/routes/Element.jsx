import { useEffect } from 'react'
import { useLazyGetElementByNumberQuery } from '../../redux/elementsApi'
import { ImSpinner2 } from 'react-icons/im'
import { useParams, useNavigate } from 'react-router-dom'

const Element = () => {
  const { number } = useParams()
  const [trigger, { data, isLoading, error }] = useLazyGetElementByNumberQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (number) {
      trigger(number)
    }
  }, [trigger, number])

  useEffect(() => {
    if (error) {
      navigate('/error')
    }
  }),
    [error]

  if (isLoading) {
    return <ImSpinner2 className="spinner" />
  }
  if (error) console.log(error)
  return <>{data && <h1>{data.number}</h1>}</>
}

export default Element
