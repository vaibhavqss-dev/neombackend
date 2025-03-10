"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const node_test_1 = __importDefault(require("node:test"));
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.default)("GET /api/status", async () => {
    const response = await (0, supertest_1.default)(server_1.default).get("/api/status");
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.strictEqual(response.body, "Server is running");
});
(0, node_test_1.default)("POST /api/login", async () => {
    const response = await (0, supertest_1.default)(server_1.default)
        .post("/api/login")
        .send({ username: "user", password: "user1233" });
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.strictEqual(response.body, "Login successful");
});
(0, node_test_1.default)("POST /api/signup", async () => {
    const response = await (0, supertest_1.default)(server_1.default)
        .post("/api/signup")
        .send({ username: "user", password: "user1233" });
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.strictEqual(response.body, "Signup successful");
});
(0, node_test_1.default)("GET /api/users", async () => {
    const response = await (0, supertest_1.default)(server_1.default).get("/api/users");
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.deepStrictEqual(response.body, []);
});
