import fetch from "node-fetch";
import handler from "@/src/pages/api/requesters/read";
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

describe("/api/requesters/read", () => {

  it("get all requesters in database", async () => {
    const res: any = await fetch("http://localhost:3001/", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    const allRequesters = await prisma.requesters.findMany({});

    const response = await res.json();

    if (allRequesters == null) {
      expect(res.status).toEqual(401);
    } else {
      expect(res.status).toEqual(200);
      expect(response.data).toEqual(allRequesters);
    }
  });
});
