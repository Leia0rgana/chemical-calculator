import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const PORT = 3000
const MONGO_URI = 'mongodb+srv://user123:pass321@cluster0.tq8mvyq.mongodb.net/'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.listen(PORT, () => console.log(`listening port ${PORT}`))

const client = new MongoClient(MONGO_URI)

client.connect().then(() => {
  console.log('connected to database')
})

const collection = client.db('course-project').collection('periodic-table')

app.post('/', async (req, res) => {
  try {
    const elementName = req.body.symbol
    const element = await collection.findOne({ symbol: elementName })
    if (element) {
      console.log(StatusCodes.OK)
      return res.status(StatusCodes.OK).send(element)
    }
    if (element === null) {
      console.log(StatusCodes.NOT_FOUND)
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    } else throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } catch (err) {
    console.log(err.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
  }
})
