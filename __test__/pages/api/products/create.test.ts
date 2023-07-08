import fetch from "node-fetch";
import handler from "@/src/pages/api/products/create";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";

const data = {
  name: "Joaozinhoaaa",
  description: "123.243.123-09",
  quantity: 4,
  price: 25,
  photo: "teste",
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

describe("/api/products/create", () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.

  it("insert product in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      method: "POST",
    });
    const response = await res.json();
 
    const productId = response.data.productId;

    const product = await prisma.products.findFirst({
      where: {
        productId: productId,
      },
    });

    if (product == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);
    }
  });
});
