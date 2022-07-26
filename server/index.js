const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth.js')

const app = express()
const PORT = process.env.PORT || 5000

require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_ACCOUNT_TOKEN
const messagingServiceSid = process.env.TWILIO_MESS_SERVICE_SID
const twilioAccount = require('twilio')(accountSid, authToken)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/', (req, res) => {
    const {text, user: sender, type, members} = req.body;

    if(type === 'message.new') {
        members.filter((person) => person.user_id !== sender.id).forEach(({person})=>{
            if(members.online) {
                twilioAccount.messages.create({
                    body: `You have a new ChitChat message from ${text.user.fullName} - ${text.text}`,
                    messagingServiceSid: messagingServiceSid,
                    to: '+1'+user.phoneNumber
                }).then(()=>{
                    console.log('Message sent')
                }).catch((err)=> console.log(err))
            }
        })

        res.status(200).send('Message sendt successfully')
    }

    return res.status(200).send('Not a new message request')





})



app.use('/auth', authRoutes)

app.listen(PORT, () => console.log('listening on port ' + PORT))