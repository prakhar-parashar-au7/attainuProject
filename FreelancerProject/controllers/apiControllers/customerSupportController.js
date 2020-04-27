const nodemailer = require('nodemailer')
const Ticket = require('../../models/Ticket')

module.exports = {
    async generateTicket(req, res) {
        try{
            const { 
                name,
                email,
                title,
                category, 
                description
            } = req.body

            if(
                !name ||
                !email ||
                !title ||
                !category ||
                !description
            ) {
              return res
                .status(400)
                .send({
                  statusCode: 400,
                  message: 'Looks like some fields are incomplete'
                })
            }
            const ticketDetails = await Ticket.create({
                name,
                email,
                title,
                category,
                description
            })

            const transport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.GMAIL_ID,
                    pass: process.env.GMAIL_PASSWORD
                }
            })

            await transport.sendMail({
                from: process.env.GMAIL_ID,
                to: `${email}`,
                subject: `Re: Mail from GigsOnTheGo`,
                text: `Hi there ${name}, We have recieved the issue that you have submmitted with us. We just wanted to let you know that our team is working on it currently to resolve it as soon as possible. We'll stay in touch and inform you as soon as the query is resolved`
            })

            await transport.sendMail({
                from: `${email}`,
                to: process.env.GMAIL_ID,
                subject: `Re: Ticket Raised on GigsOnTheGo`,
                text: `We have recieved an issue regarding ${title} on the website from Mr. ${name}. PLease open the application to resolve the issue as soon as possible and also inform the customer regarding the same`
            })

            res.status(201).json({
                "message": "Email sent to the user",
                statusCode: 201,
                ticketDetails
              })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async homeRoute (req, res) {
        res.send('Hello Visitor!! We are currently working on a building a client. Kindly visit us in some time to enjoy a wonderful friendly experience! Feel free to explore all our API functionalities!! You can visit our documentation on this link: https://docs.google.com/document/d/1NYyVtFxSs0nSKPYOYaE6xY7p16q0WTUOtxihSI-JDpY/edit?usp=sharing')
    }
}