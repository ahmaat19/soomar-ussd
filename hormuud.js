import XMLHttpRequest from 'xhr2'

export const hormuud = async (req, res) => {
    const { dailogid, shortcode, mobile, ussd_request, refid } = req.body

    // 1. 850MB+40MNT = $0.47
    // 2. 2GB+100MNT+50SMS = $0.97
    // 3. Unlimited Usbuuc = $5.6
    // 4. Unlimited Bil = $18
    // 5. Anfac 100MNT = $0.95

    // =========== Start 1. 850MB+40MNT = $0.47 ======================
    if (ussd_request === '1' && refid === 'iHR') {
        return res.send({
            dailogid,
            shortcode,
            mobile,
            end_reply: false,
            ussd_state: "continue",
            refid: 'iHR1',
            ussd_response: `Hormuud\nGeli numberka data u rabto (6xxx)`
        })
    }

    // Payment
    if (refid === 'iHR1') {
        const paymentInternetRequest = () => {
            var data = btoa(JSON.stringify({
                lacagta: '0.47',
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
    // =========== End 1. 850MB+40MNT = $0.47 ======================

}