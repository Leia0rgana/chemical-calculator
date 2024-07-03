import React from 'react'
import styles from './Card.module.css'
import { IElementInfo } from '../../types/data'

const Card = ({ cardInfo }: { cardInfo: Array<IElementInfo> }) => {
  return (
    <div className={styles.block}>
      {cardInfo.map((item, index) => (
        <React.Fragment key={index}>
          <p className={styles.text}>{item.title}</p>
          <p className={styles.text}>{item.value}</p>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Card
