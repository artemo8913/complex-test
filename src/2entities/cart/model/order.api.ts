import { API_ORDERS } from "@/1shared/api/const";

export class OrderApi {
  static async makeOrder(phone: string, cart: { id: number; quantity: number }[]) {
    const body = JSON.stringify({
      phone,
      cart,
    });

    return fetch(API_ORDERS, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => result)
      .catch((e) => {
        console.log(e);
      });
  }
}
