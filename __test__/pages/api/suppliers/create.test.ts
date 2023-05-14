import fetch from "node-fetch";
import handler from "@/src/pages/api/suppliers/create";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";

const data = {
  name: "Joaozinhoaaa",
  cpfCnpj: "123.243.123-09",
  endereco: "rua das laranjeiras",
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

describe("/api/suppliers/create", () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.

  it("insert supplier in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      method: "POST",
    });
    const response = await res.json();
    const supplierId = response.data.supplierId;

    const supplierUser = await prisma.suppliers.findFirst({
      where: {
        supplierId: supplierId,
      },
    });

    if (supplierUser == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);
    }
  });
});