import { alaaboPayment } from "./alaaboPayment.js"
const ussd_response_aR1 = `
1. Saliiida Bidaarta NEO($27)
2. Astaan Receiver($29)
3. Malabka Ragga($10)
4. Go, 2nafar biyo gudbin($20.5)
5. Digital Miisaan($15)
6. Feero Nikura($11.5)`

const options = [
    {
      req: '1',
      refid: 'aR1',
      proid: '1',
      proname: 'Saliiida Bidaarta NEO',
      proprice: '27',
    },
    {
      req: '2',
      refid: 'aR2',
      proid: '2',
      proname: 'Astaan Receiver',
      proprice: '29',
    },
    {
      req: '3',
      refid: 'aR3',
      proid: '3',
      proname: 'Malabka Ragga',
      proprice: '10',
    },
    {
      req: '4',
      refid: 'aR4',
      proid: '4',
      proname: 'Go, 2nafar biyo gudbin',
      proprice: '20.5',
    },
    {
      req: '5',
      refid: 'aR5',
      proid: '5',
      proname: 'Digital Miisaan',
      proprice: '15',
    },
    {
      req: '6',
      refid: 'aR6',
      proid: '6',
      proname: 'Feero Nikura',
      proprice: '11.5',
    },
  ]



const paymentInit = (props) => {
    const { dailogid, shortcode, mobile, ussd_request, refid } = props.req.body
    if (ussd_request === props.ussd_request && refid === 'aR') {
        return props.res.send({
            dailogid,
            shortcode,
            mobile,
            end_reply: false,
            ussd_state: "continue",
            refid: props.refid,
            ussd_response: `Xagee alaabta laguugu keenaa?`
        })
    }

    // Payment
    if (refid === props.refid) {
        props.res.send({
            dailogid,
            shortcode,
            mobile,
            end_reply: true,
            ussd_state: "end",
            ussd_response: `BIXI ($${props.proprice})`
        })

        alaaboPayment({
            proname: props?.proname,
            proid: props?.proid,
            proprice: props?.proprice,
            custnumber: `252${mobile}`,
            location: ussd_request
        })

        return null

    }
}

export const alaabo = async (req, res) => {
    const { dailogid, shortcode, mobile, ussd_request, refid } = req.body

    if (ussd_request === '2' && refid === 'mR1') {
        return res.send({
            dailogid,
            shortcode,
            mobile,
            end_reply: false,
            ussd_state: "continue",
            refid: 'aR',
            ussd_response: ussd_response_aR1
        })
    }

    options.map((o) => (
        paymentInit({
            ussd_request: o.req,
            refid: o.refid,
            proid: o.proid,
            proname: o.proname,
            proprice: o.proprice,
            req,
            res
        })
    ))
}