import { STATUS } from "@/utils/STATUS";
import { orderSchema } from "@/utils/validation";
import { createOrder, getAllOrders, getRecentOrders } from "../../_repository/order.repository";
import sendEmail from "@/utils/nodeMailer";
import sendBankDetailsEmail from "@/utils/sendBankDetails"
import { NextRequest } from "next/server";
import senDEmail from "@/utils/sendBankDetails";

export async function GET(request:NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    let orders;

    if (type === "recent") {
      orders = await getRecentOrders();
    } else {
      orders = await getAllOrders();
    }
    if (!orders) {
      return Response.json({ error: "Orders not found!", status: 400 });
    }
    return Response.json({ orders, status: STATUS.SUCCESS });
  } catch (error) {
    console.log("error 1", error);

    return Response.json(
      { error: "Internal server error", err: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  
  try {
    const formData = await request.formData();
    console.log("order data",formData)
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const streetNameAndAddress = formData.get("streetNameAndAddress");
    const annex = (formData.get("annex") as string) || null;
    const city = formData.get("city");
    const postalCodeStr = formData.get("postalCode");
    const country = formData.get("country");
    const status = formData.get("status");
    const phoneNumberStr = formData.get("phoneNumber");
    const email = formData.get("email") as string;
    const address = formData.get("address");
    // const mailAddress = formData.get("mailAddress");
    const priceStr = formData.get("price");

    const postalCode = Number(postalCodeStr);
    const phoneNumber = Number(phoneNumberStr);
    const price = Number(priceStr);

    const productDetailsStr = formData.get("productDetails") as string;
    
    let productDetails: any[] = [];
    try {
      productDetails = JSON.parse(productDetailsStr);
    } catch (error) {
      console.error("Error parsing productDetails:", error);
      return Response.json(
        { error: "Invalid productDetails format", details: error },
        { status: STATUS.BAD_REQUEST }
      );
    }
    const order = {
      firstName,
      lastName,
      streetNameAndAddress,
      annex,
      city,
      postalCode,
      country,
      phoneNumber,
      email,
      address,
      status,
      // mailAddress,
      price,
      productDetails,
    };
    const result = orderSchema.safeParse(order);
    console.log("result sd",result)
    if (!result.success) {
   
      return Response.json(
        { error: result.error },
        { status: STATUS.BAD_REQUEST }
      );
    }
    const orderData = await createOrder(order);
    if (!orderData) {
      return Response.json(
        { message: "Order not created" },
        { status: STATUS.INTERNEL_SERVER_ERROR }
      );
    }
    if (orderData && status === "approved") {
      await sendEmail(orderData) 
    }
    if (orderData && status === "pending") {
      await senDEmail(orderData); 
    }
    return Response.json({ data: orderData }, { status: STATUS.SUCCESS });
  } catch (error) {
    console.log(error)
    return Response.json(

      { message: "Internal server error", error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}
