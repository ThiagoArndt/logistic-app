import fetch from "node-fetch";
//import handler from "@/src/pages/api/products/create";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import jwt from "jsonwebtoken";
import { suppliers } from "@prisma/client";

afterAll((done) => {
  prisma.$disconnect();
  //server.close();
  done();
});
beforeAll((done) => {
  //setup(handler);
  done();
});

describe("/api/suppliers/read", () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.

  it("get all suppliers in database", async () => {
    const res: any = await fetch("http://localhost:3001/");

    const allSuppliers = await prisma.suppliers.findMany({});

    const response = await res.json();

    if (allSuppliers == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);
      expect(response.data).toEqual(allSuppliers);
    }
  });
});
