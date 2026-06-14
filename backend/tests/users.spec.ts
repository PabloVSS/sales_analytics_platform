import request from "supertest";
import { app } from "../src/app";

describe("Users Module", () => {

  it("should return users list", async () => {
    const response = await request(app)
      .get("/users");

    expect(response.status).toBe(200);

    expect(
      Array.isArray(response.body)
    ).toBe(true);
  });

});