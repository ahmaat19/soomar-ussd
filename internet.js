import { hormuud } from "./hormuud.js"
import { somnet } from "./somnet.js"

export const internet = async (req, res) => {
  const { dailogid, shortcode, mobile, ussd_request, refid } = req.body

  // Select provider
  if (ussd_request === '1' && refid === 'mR1') {
    return res.send({
      dailogid,
      shortcode,
      mobile,
      end_reply: false,
      ussd_state: "continue",
      refid: 'iR1',
      ussd_response: `Internet Data\n1. Hormuud\n2. Somnet`
    })
  }



  // =================== start hormuud data ===============
  // hormuud data
  if (ussd_request === '1' && refid === 'iR1') {
    return res.send({
      dailogid,
      shortcode,
      mobile,
      end_reply: false,
      ussd_state: "continue",
      refid: 'iHR',
      ussd_response: `Hormuud\n1. 850MB+40MNT = $0.47\n2. 2GB+100MNT+50SMS = $0.97\n3. Unlimited Usbuuc = $5.6\n4. Unlimited Bil = $18\n5. Anfac 100MNT = $0.95`
    })
  }
  hormuud(req, res)
  // =================== end hormuud data ===============



  // =================== start samnet data ===============
  // somnet data
  if (ussd_request === '2' && refid === 'iR1') {
    return res.send({
      dailogid,
      shortcode,
      mobile,
      end_reply: false,
      ussd_state: "continue",
      refid: 'iSR',
      ussd_response: `Somnet\n1. 1GB No expire = $0.48\n2. 2.5GB No expire = $0.96\n3. 12GB No expire = $4.5\n4. 24HR Unlimited = $0.47\n5. 1 Bil Unlimited = $14.8`
    })
  }
  somnet(req, res)
  // =================== end samnet data ===============


}