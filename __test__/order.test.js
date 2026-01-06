const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const Token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, {
  expiresIn: "1h",
});

const validate = require("../middleware/validate");
const orderSchema = require("../validater-joi/products.schema");
const { description } = require("../validater-joi/password");

describe("Order endpoint tests", () => {
  const testOrder = {
    products: [
      {
        productName: "iPhone 14 Pro Max",
        quantity: 1,
      },
    ],
  };

  it("Create a new order using POST api/v1/orders", async () => {
    const response = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${Token}`)
      .send(testOrder)
      .expect(200);

    console.log("Created order ===>", response.text);
  });

  it("Get an order using GET api/v1/orders/:orderId", async () => {
    const response = await request(app)
      .get("/api/v1/orders/1")
      .set("Authorization", `Bearer ${Token}`)
      .expect(200);

    console.log("Order is ===>", response.text);
  });
});
