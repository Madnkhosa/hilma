import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@/utils/STATUS";
import * as XLSX from "xlsx";
import { updateOrderTrackingId } from "@/app/(server)/_repository/order.repository"; //
import sendEmail from "@/utils/emailTrackingId";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: STATUS.BAD_REQUEST });
    }
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: Array<{
      "Order ID": string;
      "Tracking ID": string;
      Email: string;
    }> = XLSX.utils.sheet_to_json(worksheet);
    for (const row of data) {
      const {
        "Order ID": orderId,
        "Tracking ID": trackingId,
        Email: email,
      } = row;
  
      try {
        await updateOrderTrackingId(orderId, trackingId);
        const emailSubject = "Your Order Tracking ID";
        const emailText = `Your order with ID ${orderId} has been updated with the tracking ID: ${trackingId}`;
        await sendEmail({ to: email, subject: emailSubject, text: emailText });
      } catch (error) {
        console.error(`Failed to update order ${orderId}:`, error);
      }
    }
    return NextResponse.json({
      message: "File uploaded and data processed successfully",
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "An error occurred during file processing" },
      { status:STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}
