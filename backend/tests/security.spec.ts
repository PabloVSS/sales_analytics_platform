import request from "supertest";
import { app } from "../src/app";

describe("Security", () => {

  it("should reject requests without token", async () => {
    const response = await request(app)
      .get("/dashboard/kpis");

    expect(response.status).toBe(401);
  });

  it("should reject invalid token", async () => {
    const response = await request(app)
      .get("/dashboard/kpis")
      .set(
        "Authorization",
        "Bearer invalid-token"
      );

    expect(response.status).toBe(401);
  });

});