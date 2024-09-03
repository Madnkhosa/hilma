import { cookies } from 'next/headers';
import prisma from '@/utils/prisma_client';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'qefdf32fdff';
import { STATUS } from "@/utils/STATUS";

export async function POST(request: Request) {
    try {
      const userData = await request.json();
      const { email, password } = userData;
  
      const user = await prisma.auth.findUnique({
        where: { email },
      });
      if (!user) {
        return new Response(
          JSON.stringify({
            status: 'failed',
            message: 'User not found',
          }),
          { status: STATUS.NOT_FOUNT }
        );
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({
            status: 'failed',
            message: 'Invalid password',
          }),
          { status: STATUS.INVALID }
        );
      }
      
      const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
      const cookieOptions = {
        maxAge: 60 * 60 * 24,
      };
      const decoded = jwt.verify(token, secretKey);
      const response = new Response(
        JSON.stringify({
          status: 'success',
          message: 'Logged in successfully',
          token,
        }),
        { status: STATUS.SUCCESS }
      );
  
      cookies().set('token', token, cookieOptions);
  
      return response;
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
  
