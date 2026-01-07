const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

// const Token = jwt.sign({ userId: 1, role: "CUSTOMER" }, process.env.JWT_SECRET, {
//   expiresIn: "1h",
// });

const adminToken = jwt.sign(
  { userId: 1, role: "ADMIN" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

const validate = require("../middleware/validate");
//const orderSchema = require("../validater-joi/products.schema");
const productSchema = require("../validater-joi/products.schema");
const { description } = require("../validater-joi/password");

describe("Order endpoint tests", () => {
  const testOrder = {
    products: [
      {
        productName: "iPhone14",
        quantity: 2,
      },
    ],
  };

  // const products = [
  //   {
  //     productName: "iPhone14",
  //     quantity: 2,
  //   },
  // ];

  it("Create a new order using POST api/v1/orders", async () => {
    const response = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(testOrder)
      .expect(200);

    console.log("Created order ===>", response.text);
  });

  it("Get an order using GET api/v1/orders/:orderId", async () => {
    const response = await request(app)
      .get("/api/v1/orders/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    console.log("Order is ===>", response.text);
  });

  //these are continued product tests to avoid conflicts during testing of order.test.js

  // it("Update a product using PUT api/v1/products/:productId", async () => {
  //   const updatedProduct = {
  //     productName: "iPhone 14",
  //     description: "Apple iPhone model",
  //   };
  //   const response = await request(app)
  //     .patch("/api/v1/products/1")
  //     .set("Authorization", `Bearer ${adminToken}`)
  //     .send(updatedProduct)
  //     .expect(200);

  //   console.log("Updated Product ===>", response.text);
  // });

  // it("Delete a product using DELETE api/v1/products/:productId", async () => {
  //   const response = await request(app)
  //     .delete("/api/v1/products/1")
  //     .set("Authorization", `Bearer ${adminToken}`)
  //     .expect(200);

  //   console.log("Deleted Product ===>", response.text);
  // });
});
