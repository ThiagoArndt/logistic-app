import fetch from "node-fetch";
import handler from "@/src/pages/api/suppliers/update";
import prisma from "../../../utils/client";
import { server, setup } from "../../../utils/integration-test-hooks";
import { suppliers } from "@prisma/client";
import { token } from "../../../utils/integration-test-hooks";


const data: suppliers = {
  supplierId: 1,
  name: "Boa",
  cpfCnpj: "123.123.123-13",
  endereco: "rua zazazaza",
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

describe("/api/suppliers/update", () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.



  it("update supplier in database", async () => {



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
