if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');


const {validateMessage} = require('./middleware.js');

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

app.use(express.json());

app.use(express.static('public'));

app.use(cors());

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post('/message',validateMessage,(req,res) => {

    const mailData = {
        from: req.body.email,
        to: process.env.toEmailUser,
        subject: `Message from ${req.body.name} - Personal Website`,
        text: `${req.body.messageDetail} from ${req.body.email}`,
    };
    transporter.sendMail(mailData, (error,info) => {
        if (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                success: false,
                message: error.message
            })
        } else {
            console.log({message:"Mail Send", message_id: info.messageId});
            res.status(200).send({
                status: 200,
                success: true,
                message: 'Successfully messaged',
                data: req.body
            });
        }
    })
})

app.listen(port, () => {
    console.log(`App Listening on port ${port}`)
})