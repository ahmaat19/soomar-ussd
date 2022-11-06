import express from 'express'
import { alaabo } from './alaabo.js'
import { internet } from './internet.js'

const app = express()
const PORT = 3000

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Soomar USSD Page')
})

app.post('/api/ussd', async (req, res) => {

  const { dailogid, shortcode, mobile, ussd_request, refid } = req.body

  console.log({ dailogid, shortcode, mobile, ussd_request, refid })


  // start
  if (ussd_request === '*3020#') {
    return res.send({
      dailogid,
      shortcode,
      mobile,
      refid: 'mR1',
      end_reply: false,
      ussd_state: "continue",
      ussd_response: `[ -SUUQA SOOMAR- ]\n1. Internet\n2. Alaabo`
    })
  }


  // 1. internet
  internet(req, res)


  // 2. alaabo
  alaabo(req, res)



  // User has been existed the prompt
  if (ussd_request === 'exist') {
    return res.send({
      dailogid,
      shortcode,
      mobile,
      end_reply: true,
      ussd_state: "end",
    })
  }

})



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
