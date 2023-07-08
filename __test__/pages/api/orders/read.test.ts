import fetch from "node-fetch";
import handler from "@/src/pages/api/orders/read";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";

afterAll((done) => {
  prisma.$disconnect();
  server.close();

  done();
});
beforeAll((done) => {
  setup(handler);
  done();
});

describe("/api/orders/read", () => {

  it("get all orders in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    const allOrders = await prisma.orders.findMany({});

    const response = await res.json();

    if (allOrders == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);
      expect(response.data).toEqual(allOrders);
    }
  });
});
