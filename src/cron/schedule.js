const cron = require("node-cron");
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");

const Email_Host = "smtp.gmail.com";
const Sender_Mail = "devcodebotx@gmail.com";
const Mail_Password = "ukwieusrbwzgzppd";
const Ware_House_Mail = "uf71384@gmail.com";
const Host_Url = "http://134.209.223.165";

async function generateExcelFile(orders) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Daily Orders");

  worksheet.columns = [
    { header: "Order ID", key: "orderId", width: 15 },
    { header: "Customer Name", key: "customerName", width: 30 },
    { header: "Address", key: "address", width: 30 },
    { header: "City", key: "city", width: 20 },
    { header: "Postal Code", key: "postalCode", width: 10 },
    { header: "Country", key: "country", width: 10 },
    { header: "Phone Number", key: "phoneNumber", width: 30 },
    { header: "Email", key: "email", width: 30 },
    { header: "Product Details", key: "productDetails", width: 50 },
    { header: "Total Price", key: "price", width: 15 },
    { header: "status", key: "status", width: 15 },
  ];
  orders.forEach((order) => {
    let productDetails = "";
    if (Array.isArray(order.productDetails)) {
      productDetails = order.productDetails
        .map((p) => `ID: ${p.id}, Count: ${p.count}`)
        .join("; ");
    }

    worksheet.addRow({
      orderId: order.id,
      customerName: `${order.firstName} ${order.lastName}`,
      address: order.address,
      city: order.city,
      postalCode: order.postalCode,
      country: order.country,
      phoneNumber: order.phoneNumber.toString(),
      email: order.email,
      productDetails,
      price: order.price,
      status: order.status,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
async function sendEmailWithAttachment(excelBuffer) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: Email_Host,
    port: 587,
    secure: false,
    auth: {
      user: Sender_Mail,
      pass: Mail_Password,
    },
  });

  const mailOptions = {
    from: Sender_Mail,
    to: Ware_House_Mail,
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
    const emailSend = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("bffer ", error);
    console.error("Error sending email:", error);
  }
}

async function scheduleFiveMinuteEmail() {
  try {
    const res = await fetch(`${Host_Url}/api/order?type=recent`, {
      next: { tags: ["product"] },
    });
    const order = await res?.json();
    const orders = order?.orders;
    if (orders.length === 0) {
      console.log("No new orders to send.");
      return;
    }
    const approvedOrders = orders.filter(
      (order) => order.status === "approved"
    );
    if (approvedOrders.length === 0) {
      console.log("No approved orders to send.");
      return;
    }

    const excelBuffer = await generateExcelFile(approvedOrders);
    const sendEmail = await sendEmailWithAttachment(excelBuffer);
  } catch (error) {
    console.log(error);
    console.error("Error sending orders report:", error);
  }
}
cron.schedule("* * * * *", () => {
  scheduleFiveMinuteEmail();
});
