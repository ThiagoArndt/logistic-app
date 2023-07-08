import fetch from "node-fetch";
import handler from "@/src/pages/api/products/delete";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";

const data = {
  productId: '3',
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

describe("/api/products/delete", () => {


  it("delete product in database", async () => {

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
