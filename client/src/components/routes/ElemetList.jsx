import Table from '../Table'
// import styles from './ElementList.module.css'

const ElemetList = () => {
  return (
    <>
      <h2 style={{ margin: '10px 0 0 0' }}>
        Периодическая система химических элементов
      </h2>
      <Table isExtended={true} />
    </>
  )
}

export default ElemetList
