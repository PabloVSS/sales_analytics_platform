import request from "supertest";
import { app } from "../src/app";
import { describe } from "node:test";

describe("Auth Module", () => {

  it("should login successfully", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@sales.com",
        password: "123456"
      });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty(
      "token"
    );
  });

  it("should reject invalid password", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@sales.com",
        password: "wrong-password"
      });

    expect(response.status).toBe(401);
  });

});