import request from "supertest";
import { app } from "../src/app";

describe("Products Module", () => {

  it("should return products list", async () => {
    const response = await request(app)
      .get("/products");

    expect(response.status).toBe(200);

    expect(
      Array.isArray(response.body)
    ).toBe(true);
  });

  it("should return a product by id", async () => {

    const productsResponse =
      await request(app)
        .get("/products");

    const productId =
      productsResponse.body[0].id;

    const response =
      await request(app)
        .get(`/products/${productId}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
  });

});