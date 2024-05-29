import styles from './Element.module.css'
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

    if (error) {
      navigate('/error')
    }
  }, [trigger, number, navigate, error])

  const convertCPKtoRGB = (hex) => {
    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `rgb(${r}, ${g}, ${b})`
  }

  if (isLoading) {
    return <ImSpinner2 className="spinner" />
  }

  return (
    <>
      {data && (
        <div className={styles.info}>
          <div className={styles.container}>
            <div
              className={styles.element}
              style={{ backgroundColor: `${convertCPKtoRGB(data['cpk-hex'])}` }}
            >
              <div className={styles.numbers}>
                <p>{data.number}</p>
                <p>{parseFloat(data.atomic_mass).toFixed(2)}</p>
              </div>
              <div className={styles.symbol}>{data.symbol}</div>
              <i>{data.name}</i>
            </div>
            <div
              className={styles.summary}
            >{`${data.summary} Discovered by ${data.discovered_by}.`}</div>
          </div>
          <div className={` ${styles.subcontainer}`}>
            <div className={styles.block}>
              <p className={styles.text}>Номер</p>
              <p className={styles.text}>{data.number}</p>
              <p className={styles.text}>Атомная масса</p>
              <p className={styles.text}>{data.atomic_mass} а.е.м.</p>
            </div>
            <div className={styles.block}>
              <p className={styles.text}>Группа</p>
              <p className={styles.text}>{data.group}</p>
              <p className={styles.text}>Период</p>
              <p className={styles.text}>{data.period}</p>
              <p className={styles.text}>Блок </p>
              <p className={styles.text}> {data.block}</p>
            </div>
            <div className={styles.block}>
              <p className={styles.text}>Плотность</p>
              <p className={styles.text}>
                {data.density} г/см<sup>3</sup>
              </p>
              <p className={styles.text}>Температура кипения</p>
              <p className={styles.text}>{data.boil} K</p>
              <p className={styles.text}>Температура плавления</p>
              <p className={styles.text}> {data.melt} K</p>
            </div>
            <div className={styles.block}>
              <p className={styles.text}>Категория </p>
              <p className={styles.text}> {data.category}</p>
              <p className={styles.text}>Агрегатное состояние </p>
              <p className={styles.text}>{data.phase}</p>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  )
}

export default Element
