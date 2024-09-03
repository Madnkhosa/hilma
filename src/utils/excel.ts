import ExcelJS from 'exceljs';
import { Order } from '@prisma/client';

type ProductDetail = {
  id: string;
  count: number;
};

export async function generateExcelFile(orders: Order[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Daily Orders');

  worksheet.columns = [
    { header: 'Order ID', key: 'orderId', width: 15 },
    { header: 'Customer Name', key: 'customerName', width: 30 },
    { header: 'Address', key: 'address', width: 30 },
    { header: 'City', key: 'city', width: 20 },
    { header: 'Postal Code', key: 'postalCode', width: 10 },
    { header: 'Country', key: 'country', width: 10 },
    { header: 'Phone Number', key: 'phoneNumber', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Product Details', key: 'productDetails', width: 50 },
    { header: 'Total Price', key: 'price', width: 15 },
  ];
  orders.forEach((order) => {
    let productDetails = '';
    if (Array.isArray(order.productDetails)) {
      productDetails = (order.productDetails as ProductDetail[])
        .map((p) => `ID: ${p.id}, Count: ${p.count}`)
        .join('; ');
    }

    worksheet.addRow({
      orderId: order.id,
      customerName: `${order.firstName} ${order.lastName}`,
      address: order.address,
      city: order.city,
      postalCode: order.postalCode,
      country: order.country,
      phoneNumber: order.phoneNumber,
      email: order.email,
      productDetails,
      price: order.price,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer); 
}
