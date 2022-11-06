import XMLHttpRequest from 'xhr2'

export const somnet = async (req, res) => {
  const { dailogid, shortcode, mobile, ussd_request, refid } = req.body

  // 1. 1GB No expire = $0.48
  // 2. 2.5GB No expire = $0.96
  // 3. 12GB No expire = $4.5
  // 4. 24HR Unlimited = $0.47
  // 5. 1 Bil Unlimited = $14.8

  // =========== Start 1GB No expire = $0.48 ======================
  if (ussd_request === '1' && refid === 'iSR') {
    return res.send({
      dailogid,
      shortcode,
      mobile,
      end_reply: false,
      ussd_state: "continue",
      refid: 'iSR1',
      ussd_response: `Somnet\nGeli numberka data u rabto (6xxx)`
    })
  }

  // Payment
  if (refid === 'iSR1') {
    const paymentInternetRequest = () => {
      var data = btoa(JSON.stringify({
        lacagta: '0.48',
        dire: mobile,
        loodire: ussd_request,
        shirkada: 'Hormuud',
        nooca: 'Anfac Hadal',
        OfferID: 'NA',
        usercity: 'mogadisho',
        SoomarDataDealeryCash: mobile,
      }))

      const xhttp = new XMLHttpRequest()

      xhttp.onload = (result) => {
        const status = result?.currentTarget?.responseText
        console.log("status: ", status)
      }

      xhttp.open('POST', `https://soomar.so/m/payment/DataPy.php`)
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhttp.send('data=' + data)
    }

    res.send({
      dailogid,
      shortcode,
      mobile,
      end_reply: true,
      ussd_state: "end",
      ussd_response: `Waxyar sug...`
    })

    paymentInternetRequest()

    return null

  }
  // =========== End 1GB No expire = $0.48 ======================
}