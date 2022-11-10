import { internetPayment } from './internetPayment.js'




const paymentInit = (props) => {
  const { dailogid, shortcode, mobile, ussd_request, refid } = props.req.body
  if (ussd_request === props.ussd_request && refid === 'iSR') {
    return props.res.send({
      dailogid,
      shortcode,
      mobile,
      end_reply: false,
      ussd_state: "continue",
      refid: props.refid,
      ussd_response: `Somnet\nGeli numberka data u rabto (6xxx)`
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
      ussd_response: `Waxyar sug...`
    })


    internetPayment({
      lacagta: props.amount,
      dire: mobile,
      loodire: ussd_request,
      shirkada: 'Hormuud',
      nooca: 'Anfac Hadal',
      OfferID: 'NA',
      usercity: 'mogadisho',
      SoomarDataDealeryCash: `615941594`,
    })

    return null

  }
}


export const somnet = async (req, res) => {

  // 1. 1GB No expire = $0.48
  // 2. 2.5GB No expire = $0.96
  // 3. 12GB No expire = $4.5
  // 4. 24HR Unlimited = $0.47
  // 5. 1 Bil Unlimited = $14.8

  paymentInit({
    ussd_request: '1',
    refid: 'iSR1',
    amount: '0.48',
    req,
    res
  })

  paymentInit({
    ussd_request: '2',
    refid: 'iSR2',
    amount: '0.96',
    req,
    res
  })

  paymentInit({
    ussd_request: '3',
    refid: 'iSR3',
    amount: '4.5',
    req,
    res
  })

  paymentInit({
    ussd_request: '4',
    refid: 'iSR4',
    amount: '0.47',
    req,
    res
  })

  paymentInit({
    ussd_request: '5',
    refid: 'iSR5',
    amount: '14.8',
    req,
    res
  })

}