const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const adminToken = jwt.sign(
  { userId: 1, role: "ADMIN" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

const validate = require("../middleware/validate");
const productSchema = require("../validater-joi/products.schema");
const { description } = require("../validater-joi/password");

describe("Product endpoint tests", () => {
  const testProduct = {
    productName: "iPhone 14 Pro Max",
    description: "Latest Apple iPhone model",
    quantityInStock: 10,
    category: "Electronics",
    price: 2000,
  };

  it("Create a new product using POST api/v1/products", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(testProduct)
      .expect(200);

    //expect(response.body).toMatchObject(testProduct);
    console.log("Created product ===>", response.text);
  });

  it("Get all products using GET api/v1/products", async () => {
    const response = await request(app)
      .get("/api/v1/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    console.log("Products are ===>", response.text);
  });

  it("Update a product using PUT api/v1/products/:productId", async () => {
    const updatedProduct = {
      productName: "Fuso Truck",
      description: "TATA Truck",
    };
    const response = await request(app)
      .patch("/api/v1/products/5")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updatedProduct)
      .expect(200);
  });

  // it("Delete a product using DELETE api/v1/products/:productId", async () => {
  //   const response = await request(app)
  //     .delete("/api/v1/products/4")
  //     .set("Authorization", `Bearer ${adminToken}`)
  //     .expect(200);

  //   console.log("Deleted Product ===>", response.text);
  // });

  afterAll(async () => {
    await prisma.product.deleteMany({
      where: {
        OR: [
          { productId: testProduct.productId },
          { productName: testProduct.productName },
        ],
      },
    });
  });
});
