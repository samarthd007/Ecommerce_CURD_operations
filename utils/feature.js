const nodemailer = require('nodemailer')

const sendMail = async (subject, to, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    await transporter.sendMail({ to, text, subject })
}

module.exports = { sendMail }
