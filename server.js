const express = require('express')
const app = express()
const userrouter = require('./router/users')
const connectDB = require('./config/db')

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(userrouter)

connectDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})