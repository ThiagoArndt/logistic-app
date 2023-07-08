import fetch from "node-fetch";
import handler from "@/src/pages/api/orders/create";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";

const data = {
  date: 'teste',
  productId: 2,
  requesterId: 1,
  totalQuantity: 25,
};


afterAll((done) => {
  prisma.$disconnect();
  server.close();

  done();

});
beforeAll((done) => {
  setup(handler);
  done();
});

describe("/api/orders/create", () => {


  it("insert order in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      method: "POST",
    });
    const response = await res.json();
 
    const orderId = response.data.orderId;

    const order = await prisma.orders.findFirst({
      where: {
        orderId: orderId,
      },
    });

    if (order == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);
    }
  });
});
