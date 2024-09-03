
import prisma from '@/utils/prisma_client';
const bcrypt = require('bcryptjs');
import { STATUS } from "@/utils/STATUS";

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const { name, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.auth.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'admin', 
      },
    });
   

    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'User registered successfully',
      }),
      { status: STATUS.SUCCESS }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: 'failed',
        message: 'Internal Server Error',
        error: error,
      }),
      { status: STATUS.INTERNEL_SERVER_ERROR }
    );
  }
}
