import fetch from "node-fetch";
import handler from "@/src/pages/api/requesters/create";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { token } from "../../../utils/integration-test-hooks";

const data = {
  name: 'Junin',
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

describe("/api/requesters/create", () => {


  it("insert requester in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      method: "POST",
    });
    const response = await res.json();
 
    const requesterId = response.data.requesterId;

    const request = await prisma.requesters.findFirst({
      where: {
        requesterId: requesterId,
      },
    });

    if (request == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);
    }
  });
});
