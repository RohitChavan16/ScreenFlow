import transporter from "../config/nodemailer.js";


export const sendConfirmationEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,    
    to: to,                         
    subject: subject,
    html: htmlContent
  };
 try {
    const info = await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.error(`❌ Email failed to ${to}:`, error.message);
  }
}