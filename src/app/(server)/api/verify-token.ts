// pages/api/verify-token.ts
import { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

const secretKey = "qefdf32fdff";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token as string, secretKey);

    if ((decoded as any).role === "admin") {
      return res.redirect("/dashboard/products");
    }

    res.setHeader("loggedUser", JSON.stringify(decoded));
    return res.status(200).send("Token verified");
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.redirect("/login");
  }
}
