if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.port || 3000;
const nodemailer = require('nodemailer')

// Create Transporter Object
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
            user: process.env.emailUser,
            pass: process.env.emailPass
        },
    secure: true
});

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.use(cors());

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post('/message',(req,res) => {
    const mailData = {
        from: req.body.email,
        to: process.env.toEmailUser,
        subject: `Message from ${req.body.name} - Personal Website`,
        text: req.body.messageDetail,
    };
    transporter.sendMail(mailData, (error,info) => {
        if (error) {
            return console.log(error);
        }
        console.log({message:"Mail Send", message_id: info.messageId})
        res.status(200).redirect('back');
    })
})

app.listen(port, () => {
    console.log(`App Listening on port ${port}`)
})