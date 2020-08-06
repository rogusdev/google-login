const express = require('express')
//const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

const CLIENT_ID = "861609598303-o00osplh8n4jidur6mr6931c8sjikjuu.apps.googleusercontent.com"
const { OAuth2Client } = require('google-auth-library')
const googleOAuth2Client = new OAuth2Client(CLIENT_ID)

async function googleTokenVerify(idToken) {
  const ticket = await googleOAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: [CLIENT_ID]
  })

  console.log(ticket)
  const payload = ticket.getPayload()
  const userid = payload['sub']
  const domain = payload['hd']

  console.log(payload)
}

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// https://expressjs.com/en/resources/middleware/cookie-parser.html
//app.user(cookieParser());

// https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application
app.use(express.json());

app.get('/', (req, res) => {
    console.log('CHRIS: cookies')
    console.log(req.cookies)
    res.send('Hello World!') 
})

app.post('/authtest', (req, res) => {
    console.log('CHRIS: cookies')
    console.log(req.cookies)
    console.log('CHRIS: body')
    console.log(req.body)
    if (req.body && req.body.id_token) {
        googleTokenVerify(req.body.id_token).catch(console.error)
    }
    res.send({ a: 1, b: true, z: "yo", 123: 4.56, c: null }) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
