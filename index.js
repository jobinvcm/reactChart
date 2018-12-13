const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const sendmail = require('sendmail')();
var send = require('gmail-send')

const app = express()
app.use(bodyParser.json())
app.unsubscribe(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
   const htmlEmail = `
    <h3>Contact Details </h3>
    <ul>
     <li>Name : ${req.body.name}</li>
     <li>Email: ${req.body.email}</li>
    </ul>
    <p>${req.body.message}</p>
   `
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a35f79ae7f1822",
        pass: "0749d4785a50a6"
      }
    });

// //   const transporter = nodemailer.createTransport({
// //    host: 'smtp.ethereal.email',
// //    port: 587,
// //    auth: {
// //        user: 'ttgv6utk7mvnzecg@ethereal.email',
// //        pass: '5159Eh2KxDD9vfqdnV'
// //    }
// // });

// const transporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//   user: 'jobinvcm.1@gmail.com',
//   pass: 'jesus@4evr',
//  }
// })

let mailOptions = {
 from: 'jobinvcm@gmail.com',
 to: 'jobinvcm@gmail.com',
 replyTo: 'e602db50b5-355d5a@inbox.mailtrap.io',
 text: req.body.message,
 html: htmlEmail
}

transport.sendMail(mailOptions, (err, info) => {
 if(err) {
  return console.log(err)
 }
 console.log('Message snt:', info.message)
})

})

// sendmail({
//   from: 'jobinvcm@gmail.com',
//   to: 'jobinvcm@gmail.com',
//   subject: 'test send mail',
//   html: 'Mail detail',
// }, function(err, reply) {
//   console.log(err && err.stack);
//   console.dir(reply);
// })
});

const PORT = 3001

app.listen(PORT, () => {
 console.log(`Server listentn on port ${PORT}`)
})
