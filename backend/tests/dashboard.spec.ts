import request from "supertest";
import { app } from "../src/app";

describe("Dashboard Module", () => {
  let token: string;

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@sales.com",
        password: "123456",
      });

    token = login.body.token;
  });

it("should return kpis", async () => {
  const response = await request(app)
    .get("/dashboard/kpis")
    .set("Authorization", `Bearer ${token}`);

  console.log(response.body);

  expect(response.status).toBe(200);
});

  it("should return monthly revenue", async () => {
    const response = await request(app)
      .get("/dashboard/monthly-revenue")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return top customers", async () => {
    const response = await request(app)
      .get("/dashboard/top-customers")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});