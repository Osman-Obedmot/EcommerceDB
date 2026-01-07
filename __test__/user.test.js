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
const userSchema = require("../validater-joi/users.schema");

describe("User endpoint tests", () => {
  const testUser = {
    username: "testuser",
    email: "Testuser@gmail.com",
    password: "Test@5000",
  };

  it("Create a new user using POST api/v1/users/auth/signup", async () => {
    const response = await request(app)
      .post("/api/v1/users/auth/signup")
      .send(testUser)
      .expect(200);

    expect(response.text).toBe(
      `User ${testUser.username} created successfully`
    );
  });

  it("Login user using POST api/v1/users/auth/login", async () => {
    const LoginUser = {
      email: "Testuser@gmail.com",
      password: "Test@5000",
    };
    const response = await request(app)
      .post("/api/v1/users/auth/login")
      .send(LoginUser)
      .expect(200);

    expect(response.text).toContain("token");
    console.log("Login Response ===>", response.text);
  });

  it("Get user by ID using GET api/v1/users/:id", async () => {
    const response = await request(app)
      .get("/api/v1/users/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    console.log("User is ===>", response.text);
  });

  // afterAll(async () => {
  //   await prisma.user.delete({
  //     where: { email: testUser.email },
  //   });
  // });
});
