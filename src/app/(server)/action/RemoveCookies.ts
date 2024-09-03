"use server";
import { cookies } from "next/headers";
interface CookieValue {
  productId: string;
  count: number;
}
export const RemoveCookieByProductId = async (productId: string) => {
  const existingCookie = cookies().get("values");
  let existingValues: CookieValue[] = [];

  if (existingCookie) {
    try {
      existingValues = JSON.parse(existingCookie.value) as CookieValue[];
    } catch (error) {
      console.error("Failed to parse existing cookie", error);
      return;
    }
  }
  const filteredValues = existingValues.filter(
    (value) => value.productId !== productId
  );
  if (filteredValues.length === 0) {
    cookies().delete("values");
  } else {
    const encodedValues = JSON.stringify(filteredValues);
    cookies().set("values", encodedValues);
  }
};
