import styles from './Element.module.css'
import { useEffect } from 'react'
import { useLazyGetElementByNumberQuery } from '../../redux/elementsApi'
import { ImSpinner2 } from 'react-icons/im'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../UI/Card'
import { IElementInfo } from '../../types/data'

const Element = () => {
  const { number } = useParams()
  const [trigger, { data, isLoading, error }] = useLazyGetElementByNumberQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof number === 'string') {
      trigger(parseInt(number))
    }

    if (error) {
      navigate('/error')
    }
  }, [trigger, number, navigate, error])

  const convertCPKtoRGB = (hex: string): string => {
    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `rgb(${r}, ${g}, ${b})`
  }

  let elementInfo: Array<IElementInfo[]> | undefined

  if (isLoading) {
    return <ImSpinner2 className="spinner" />
  } else if (data) {
    elementInfo = [
      [
        { title: 'Номер', value: data.number },
        { title: 'Атомная масса', value: `${data.atomic_mass} а.е.м.` },
      ],
      [
        { title: 'Группа', value: data.group },
        { title: 'Период', value: data.period },
        { title: 'Блок', value: data.block },
      ],
      [
        { title: 'Плотность', value: `${data.density} г/см³` },
        { title: 'Температура кипения', value: `${data.boil} K` },
        { title: 'Температура плавления', value: `${data.melt} K` },
      ],
      [
        { title: 'Категория', value: data.category },
        { title: 'Агрегатное состояние', value: data.phase },
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
                <p>{data.atomic_mass.toFixed(2)}</p>
              </div>
              <div className={styles.symbol}>{data.symbol}</div>
              <i>{data.name}</i>
            </div>
            <div
              className={styles.summary}
            >{`${data.summary} Discovered by ${data.discovered_by}.`}</div>
          </div>
          <div className={` ${styles.subcontainer}`}>
            {elementInfo &&
              elementInfo.map((item, index) => (
                <Card cardInfo={item} key={index} />
              ))}
          </div>
        </div>
      )}{' '}
    </>
  )
}

export default Element
