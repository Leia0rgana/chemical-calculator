const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const StatusCodes = require('http-status-codes').StatusCodes
const ReasonPhrases = require('http-status-codes').ReasonPhrases
const balanceEq = require('chem-eb')

const PORT = 3000
const MONGO_URI = 'mongodb+srv://user123:pass321@cluster0.tq8mvyq.mongodb.net/'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.listen(PORT, () => console.log(`listening port ${PORT}`))

const client = new MongoClient(MONGO_URI)

client
  .connect()
  .then(() => {
    console.log('connected to database')
  })
  .catch((err) => console.log(err.message))

const collection = client.db('course-project').collection('periodic-table')

app.get('/', async (req, res) => {
  try {
    const elements = await collection.find().toArray()
    if (elements.length > 0) {
      return res.status(StatusCodes.OK).send(elements)
    } else if (elements.lenght === 0) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }
    //else
    //   return res
    //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
    //     .send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }
})

app.post('/', async (req, res) => {
  try {
    const elementName = req.body.symbol
    const element = await collection.findOne({ symbol: elementName })
    if (element) {
      return res.status(StatusCodes.OK).send(element)
    } else if (element === null) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }
})
