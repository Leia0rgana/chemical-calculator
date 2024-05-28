import { useGetElementsQuery } from '../../redux/elementsApi'
import { setElementNumber } from '../../redux/slices/elementSlice'
import styles from './ElementList.module.css'
import { ImSpinner2 } from 'react-icons/im'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getElementLocation } from '../../data/lanthanoidAndActinoid'
import { useDispatch } from 'react-redux'

const ElemetList = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetElementsQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      navigate('/error')
    }
  }),
    [error]

  const handleClick = (number) => {
    dispatch(setElementNumber(number))
    navigate(`/element-list/${number}`)
  }

  const setElementColor = (block) => {
    if (block === 's') return { backgroundColor: 'rgb(255, 88, 213, 0.508)' }
    else if (block === 'p')
      return { backgroundColor: 'rgb(221, 237, 78, 0.508)' }
    else if (block === 'd')
      return { backgroundColor: 'rgb(69, 146, 233, 0.508)' }
    else if (block === 'f')
      return { backgroundColor: 'rgb(162, 54, 181, 0.508)' }
  }

  if (isLoading) {
    return <ImSpinner2 className="spinner" />
  }

  return (
    <>
      <h2 style={{ margin: '20px 0' }}>
        Периодическая система химических элементов
      </h2>
      <BlockClassification />
      <div className={styles.table}>
        {data &&
          data.map((element) => {
            const locationStyles = getElementLocation(
              element.number,
              element.period,
              element.group
            )
            const colorStyles = setElementColor(element.block)
            return (
              <button
                key={element.number}
                className={styles.element}
                style={{ ...locationStyles, ...colorStyles }}
                onClick={() => handleClick(element.number)}
              >
                <div>{element.number}</div>
                <div>{element.symbol}</div>
                <div>{parseFloat(element.atomic_mass).toFixed(2)}</div>
              </button>
            )
          })}
      </div>
    </>
  )
}

const BlockClassification = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.blockList}>
        <li className={styles.s}>s-элементы</li>
        <li className={styles.p}>p-элементы</li>
        <li className={styles.d}>d-элементы</li>
        <li className={styles.f}>f-элементы</li>
      </ul>
    </div>
  )
}

export default ElemetList
