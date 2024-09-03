"use server";
import { cookies } from "next/headers";

interface CookieValue {
  productId: string;
  count: number;
}

export const SetCookies = async (values: CookieValue) => {
  const existingCookie = cookies().get("values");
  let existingValues: CookieValue[] = [];

  if (existingCookie) {
    try {
      existingValues = JSON.parse(existingCookie.value) as CookieValue[];
    } catch (error) {
      console.error("Failed to parse existing cookie", error);
    }
  }
  const newValues = {
    ...values,
    count: values.count.toString(),
  };
  const updatedValues = existingValues.map((value) =>
    value.productId === newValues.productId ? newValues : value
  );
  if (
    !existingValues.find((value) => value.productId === newValues.productId)
  ) {
    updatedValues.push(newValues);
  }
  const encodedValues = JSON.stringify(updatedValues);
  cookies().set("values", encodedValues);
};
