import fetch from "node-fetch";
import handler from "@/src/pages/api/auth/register";
import prisma from "../../..//utils/client";
import { server, setup, teardown } from "../../../utils/integration-test-hooks";
import { cleanUp } from "../../..//utils/db-test-setup";

const data = {
  username: "teste",
  email: "teste@gmail.com",
  password: "@Teste123",
};

beforeAll((done) => {
  jest.setTimeout(3 * 60 * 1000);
  setup(handler);
  done();
});

afterAll((done) => {
  prisma.$disconnect();
  server.close();
  done();
});

describe("/api/register", () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.

  it("registers a new user", async () => {
    const response = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    expect(response.status).toEqual(200);
  });

  it("tries to regiter same user again", async () => {
    const response = await fetch("http://localhost:3001/", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    expect(response.status).toEqual(401);
  });
});
