import supertest from "supertest";
import app from "../server";
import test from "node:test";
import assert from "node:assert";

// status
test("GET /api/status", async () => {
  const response = await supertest(app).get("/api/status");
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body, "Server is running");
});

//test login
test("POST /api/login", async () => {
  const response = await supertest(app)
    .post("/api/login")
    .send({ username: "user", password: "user1233" });
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body, "Login successful");
});

//signup
test("POST /api/signup", async () => {
  const response = await supertest(app)
    .post("/api/signup")
    .send({ username: "user", password: "user1233" });
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body, "Signup successful");
});

test("GET /api/users", async () => {
  const response = await supertest(app).get("/api/users");
  assert.strictEqual(response.status, 200);
  assert.deepStrictEqual(response.body, []);
});
