"use server";
const nodemailer = require("nodemailer");
export async function sendEmailWithAttachment(excelBuffer: Buffer) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.WARE_HOUSE_EMAIL,
    subject: "Daily Orders",
    text: "Please find attached the daily orders.",
    attachments: [
      {
        filename: "daily_orders.xlsx",
        content: excelBuffer,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("bffer ", error);
    console.error("Error sending email:", error);
  }
}
