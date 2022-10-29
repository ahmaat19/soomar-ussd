import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Soomar USSD Home Page')
})

app.get('/api/ussd', (req, res) => {
  res.send('Soomar USSD')
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
