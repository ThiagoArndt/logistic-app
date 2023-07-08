import fetch from "node-fetch";
import handler from "@/src/pages/api/orders/update";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { orders} from "@prisma/client";
import { token } from "../../../utils/integration-test-hooks";


const data :orders = {
  date: 'babaa',
  productId: 2,
  requesterId: 1,
  totalQuantity: 14,
  orderId: 1,
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

describe("/api/orders/update", () => {
  it("update order in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const response = await res.json();

    if (response.data == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);

      expect(response.data).toEqual(data);
    }
  });
});
