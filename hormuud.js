import { internetPayment } from "./internetPayment.js"



const paymentInit = (props) => {
    const { dailogid, shortcode, mobile, ussd_request, refid } = props.req.body
    if (ussd_request === props.ussd_request && refid === 'iHR') {
        return props.res.send({
            dailogid,
            shortcode,
            mobile,
            end_reply: false,
            ussd_state: "continue",
            refid: props.refid,
            ussd_response: `Hormuud\nGeli numberka data u rabto (6xxx)`
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
            SoomarDataDealeryCash: mobile,
        })

        return null

    }
}

export const hormuud = async (req, res) => {

    // 1. 850MB+40MNT = $0.47
    // 2. 2GB+100MNT+50SMS = $0.97
    // 3. Unlimited Usbuuc = $5.6
    // 4. Unlimited Bil = $18
    // 5. Anfac 100MNT = $0.95

    paymentInit({
        ussd_request: '1',
        refid: 'iHR1',
        amount: '0.47',
        req,
        res
    })
    paymentInit({
        ussd_request: '2',
        refid: 'iHR2',
        amount: '0.97',
        req,
        res
    })
    paymentInit({
        ussd_request: '3',
        refid: 'iHR3',
        amount: '5.6',
        req,
        res
    })
    paymentInit({
        ussd_request: '4',
        refid: 'iHR4',
        amount: '18',
        req,
        res
    })
    paymentInit({
        ussd_request: '5',
        refid: 'iHR5',
        amount: '0.95',
        req,
        res
    })


}