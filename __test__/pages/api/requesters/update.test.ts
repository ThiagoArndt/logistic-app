import fetch from "node-fetch";
import handler from "@/src/pages/api/requesters/update";
import prisma from "../../../utils/client";
import { server, setup } from "../../../utils/integration-test-hooks";
import { requesters} from "@prisma/client";
import { token } from "../../../utils/integration-test-hooks";


const data :requesters = {
name: 'Joao',
requesterId: 1,
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

describe("/api/requesters/update", () => {
  it("update requester in database", async () => {
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
