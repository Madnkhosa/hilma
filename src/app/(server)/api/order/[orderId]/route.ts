import {
  getOrderbyId,
  updateOrder,
} from "@/app/(server)/_repository/order.repository";
import sendEmail from "@/utils/nodeMailer";
import { STATUS } from "@/utils/STATUS";

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const id = params.orderId;
    const order = await getOrderbyId(id);
    if (!order) {
      return Response.json(
        { error: "Order not found!" },
        {
          status: STATUS.NOT_FOUNT,
        }
      );
    }
    return Response.json(
      { order: order },
      {
        status: STATUS.SUCCESS,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Internal server error", err: error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}



export async function PUT(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {

    const id = params.orderId;
    console.log("id order",id)
    const formData = await request.formData();
    const status = formData.get("status");
    console.log("status i",status)

    if (!status) {
      return Response.json(
        { message: "Order not found" },
        {
          status: STATUS.BAD_REQUEST,
        }
      );
    }

    const existingOrder = await getOrderbyId(id);
    if (!existingOrder) {
      return Response.json(
        { message: "Order not found" },
        {
          status: STATUS.NOT_FOUNT,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updatedOrder = await updateOrder(id, status);
    if (!updatedOrder) {
      return Response.json(
        { message: "Order status not updated" },
        { status: STATUS.INTERNEL_SERVER_ERROR }
      );
    }

if(status==="approved"){
  await sendEmail(existingOrder)
}
    return Response.json({ data: updatedOrder }, { status: STATUS.SUCCESS });
  } catch (error) {
    console.error("error", error);
    return Response.json(
      { error: "Internal server error", err: error },
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}
