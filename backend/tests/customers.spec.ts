import request from "supertest";
import { app } from "../src/app";

describe("Customers Module", () => {

  it("should return customers", async () => {
    const response = await request(app)
      .get("/customers");

    expect(response.status).toBe(200);

    expect(
      Array.isArray(response.body)
    ).toBe(true);
  });

});