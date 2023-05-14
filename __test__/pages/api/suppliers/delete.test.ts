import fetch from "node-fetch";
import handler from "@/src/pages/api/suppliers/delete";
import prisma from "../../../utils/client";
import { server, setup } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";




const data = {
  supplierId: '2',
};

afterAll((done) => {
  prisma.$disconnect();
  server.close();
  done();
});
beforeAll((done) => {
  setup(handler, data);
  done();
});

describe("/api/suppliers/delete", () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.

  it("delete supplier in database", async () => {

    const res: any = await fetch(`http://localhost:3001/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      method: "DELETE",
    });
    const response = await res.json();


    if (response.data != null) {
      expect(res.status).toEqual(200);
    } else {
      expect(res.status).toEqual(401);
    }

  });
});
