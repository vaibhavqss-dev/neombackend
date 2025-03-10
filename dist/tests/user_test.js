"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const node_test_1 = __importDefault(require("node:test"));
const node_assert_1 = __importDefault(require("node:assert"));
// status
(0, node_test_1.default)("GET /api/status", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server_1.default).get("/api/status");
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.strictEqual(response.body, "Server is running");
}));
//test login
(0, node_test_1.default)("POST /api/login", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server_1.default)
        .post("/api/login")
        .send({ username: "user", password: "user1233" });
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.strictEqual(response.body, "Login successful");
}));
//signup
(0, node_test_1.default)("POST /api/signup", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server_1.default)
        .post("/api/signup")
        .send({ username: "user", password: "user1233" });
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.strictEqual(response.body, "Signup successful");
}));
(0, node_test_1.default)("GET /api/users", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server_1.default).get("/api/users");
    node_assert_1.default.strictEqual(response.status, 200);
    node_assert_1.default.deepStrictEqual(response.body, []);
}));
