"use server";
import nodemailer from "nodemailer";
const fs = require("fs");

export default async function senDEmail(data) {
  let file;
  let subject;
  const billing = data;
  console.log(billing)
  const products = await Promise.all(
    billing.productDetails.map(async (productDetail) => {
      const response = await fetch(
        `${process.env.HOST_URL}/api/product/${productDetail.id}`
      );
      const productData = await response.json();

      return {
        title: productData.product.title,
        price: productData.product.price,
        count: productDetail.count,
      };
    })
  );

  const filePath = "./src/assets/templetes/orderMailBankTransfer.html";

  file = fs.readFileSync(filePath, {
    encoding: "utf-8",
  });
  file = file.replace("$billingName", billing.firstName);
  file = file.replace("$orderId", data.id);

  const currentDate = new Date();
  const formattedDate =
    currentDate.getDate().toString().padStart(2, "0") +
    "-" +
    (currentDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    currentDate.getFullYear();

  const formattedTime =
    currentDate.getHours().toString().padStart(2, "0") +
    ":" +
    currentDate.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = formattedDate + " " + formattedTime;
  file = file.replace("$date", formattedDateTime);
  file = file.replace("$billingAddress_1", billing.streetNameAndAddress);
  file = file.replace("$billingAddress_2", billing.annex);
  file = file.replace("$billingCity", billing.city);
  let billingState = "";
  file = file.replace("$billingState", billing.address);
  file = file.replace("$billingPostcode", billing.postalCode);
  file = file.replace("$billingCountry", billing.country);
  file = file.replace("$billingPhoneNo", billing.phoneNumber);
  file = file.replace("$billingEmail", billing.email);
  file = file.replace("$shippingAddress_1", billing.streetNameAndAddress);
  file = file.replace("$shippingAddress_2", billing.annex);
  file = file.replace("$shippingCity", billing.city);
  file = file.replace("$shippingState", billing.address);
  file = file.replace("$shippingPostcode", billing.postalCode);
  file = file.replace("$shippingCountry", billing.country);
  file = file.replace("$shippingPhoneNo", billing.phoneNumber);
  file = file.replace("$shippingName", billing.firstName);
  let totalPriceInEuros = billing.price;
  file = file.replace("$total", totalPriceInEuros);
  file = file.replace("$subtotal", totalPriceInEuros);
  file = file.replace("$shipping_total", totalPriceInEuros);

  let productsHtml = "";
  products.forEach((product, index) => {
    productsHtml += `
      <tr>
        <td>${product.title}</td>
        <td>${product.count}</td>
        <td>${product.price}</td>
      </tr>
    `;
  });

  file = file.replace("$productsPlaceholder", productsHtml);

  let payment_method_title = "Credit Card";
  file = file.replace("$payment_method_title", payment_method_title);
  subject = "Email send by hilma biocare";
  const to = billing.email;
  const adminEmail =process.env.ADMIN_MAIL;
  await send(to, file, subject);
  await send(adminEmail, file, subject);
}
async function send(to, html, subject) {
  
  try {
    let from = process.env.SENDER_EMAIL;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host:  process.env.EMAIL_HOST,
      port: 587,
      secure: false,

      auth: {
        user: from,
        pass: process.env.SENDER_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: "Hilma" + from,
      to: to,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log(error);
    console.error("Eror", error);
  }
}
