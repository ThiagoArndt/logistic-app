import fetch from "node-fetch";
import handler from "@/src/pages/api/products/update";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { products, suppliers } from "@prisma/client";
import { token } from "../../../utils/integration-test-hooks";


const data: products = {
  productId: 2,
  name: "Boa",
  description: "",
  photo: "teste",
  price: 21,
  quantity: 3,
  supplierId: 3
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

describe("/api/products/update", () => {
  it("update product in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const response = await res.json();
    console.log(response)
    if (response.data == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);

      expect(response.data).toEqual(data);
    }
  });
});
