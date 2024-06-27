const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const StatusCodes = require('http-status-codes').StatusCodes
const ReasonPhrases = require('http-status-codes').ReasonPhrases
const balanceEq = require('chem-eb')
require('dotenv').config()

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.listen(PORT, () => console.log(`listening port ${PORT}`))

const client = new MongoClient(process.env.MONGO_URI)

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
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }
})

app.get('/elements-list/:number', async (req, res) => {
  try {
    const element = await collection.findOne({
      number: parseInt(req.params.number),
    })
    if (element) {
      return res.status(StatusCodes.OK).send(element)
    } else {
      console.log(ReasonPhrases.NOT_FOUND)
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }
  } catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }
})

app.post('/', async (req, res) => {
  try {
    const equation = req.body.equation
    const balancedEquation = balanceEq(equation)

    if (balancedEquation.outChem.includes('0'))
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .send('Проверьте правильность введенной реакции')
    else if (balancedEquation.outChem) {
      return res.status(StatusCodes.OK).send(balancedEquation)
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send('Необходимо ввести химическую реакцию')
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Внутренняя ошибка')
  }
})
