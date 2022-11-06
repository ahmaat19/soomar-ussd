export const alaabo = async (req, res) => {
    const { dailogid, shortcode, mobile, ussd_state, ussd_request, refid } = req.body

    if (ussd_request === '2' && refid === 'mR1') {
        return res.send({
            dailogid,
            shortcode,
            mobile,
            end_reply: true,
            ussd_state: "end",
            ussd_response: `Alaabo is under development`
        })
    }

}