import fetch from "node-fetch";
import handler from "@/src/pages/api/auth/login";
import prisma from "../../../utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

const data = {
  email: "teste@gmail.com",
  password: "@Teste123",
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
describe("/api/login", () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.

  it("check if user exists", async () => {
    const response = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user == null) {
      expect(response.status).toEqual(401);
    } else {
      expect(response.status).toEqual(200);
    }
  });

  it("check if jwt token is valid", async () => {
    const response: any = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user == null) {
      expect(response.status).toEqual(401);
    } else {
      const result = await response.json();

      const jwtValue: any = jwt.verify(result.token, secret!);

      expect(jwtValue.username).toEqual("teste");

      expect(response.status).toEqual(200);
    }
  });
});
