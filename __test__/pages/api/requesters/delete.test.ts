import fetch from "node-fetch";
import handler from "@/src/pages/api/requesters/delete";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";

const data = {
  requesterId: '1',
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

describe("/api/requesters/delete", () => {


  it("delete requester in database", async () => {

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
