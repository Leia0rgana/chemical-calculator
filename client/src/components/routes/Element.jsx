import styles from './Element.module.css'
import { useEffect } from 'react'
import { useLazyGetElementByNumberQuery } from '../../redux/elementsApi'
import { ImSpinner2 } from 'react-icons/im'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../UI/Card'

class ElementInfo {
  constructor(title, value) {
    this.title = title
    this.value = value
  }
}

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

  let elementInfo

  if (isLoading) {
    return <ImSpinner2 className="spinner" />
  } else if (data) {
    elementInfo = [
      [
        new ElementInfo('Номер', data.number),
        new ElementInfo('Атомная масса', `${data.atomic_mass} а.е.м.`),
      ],
      [
        new ElementInfo('Группа', data.group),
        new ElementInfo('Период', data.period),
        new ElementInfo('Блок', data.block),
      ],
      [
        new ElementInfo('Плотность', `${data.density} г/см³`),
        new ElementInfo('Температура кипения', `${data.boil} K`),
        new ElementInfo('Температура плавления', `${data.melt} K`),
      ],
      [
        new ElementInfo('Категория', data.category),
        new ElementInfo('Агрегатное состояние', data.phase),
      ],
    ]
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
            {elementInfo.map((item, index) => (
              <Card cardInfo={item} key={index} />
            ))}
          </div>
        </div>
      )}{' '}
    </>
  )
}

export default Element
