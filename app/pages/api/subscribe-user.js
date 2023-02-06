import mailchimp from '@mailchimp/mailchimp_marketing'
import md5 from 'md5'

export default async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  const API_KEY = process.env.MAILCHIMP_API_KEY
  const DATACENTER = process.env.MAILCHIMP_API_SERVER
  const emailHash = md5(email)

  // console.log(AUDIENCE_ID, API_KEY, DATACENTER)

  mailchimp.setConfig({
    apiKey: API_KEY,
    server: DATACENTER,
  })

  // async function callPing() {
  //   const response = await mailchimp.ping.get();
  //   console.log(response);
  // }

  async function subscribeUser() {
    const response = await mailchimp.lists.setListMember(
      AUDIENCE_ID,
      emailHash,
      {
        email_address: email,
        status_if_new: "pending",
      }
    )

    if (response.id) {
      return res.status(201).json({
        message: 'Success'
      })
    } else {
      return res.status(400).json({
        error: response.detail,
      })
    }
  }

  // await callPing()
  subscribeUser().catch(errors => {
    return res.status(400).json({
      error: errors.response.body.detail,
    })
  })
};