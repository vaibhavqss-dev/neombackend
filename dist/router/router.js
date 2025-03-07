"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../controller/auth");
router.route("/login").post(auth_1.loginUser);
router.route("/signup").post(auth_1.userSignup);
// Server Status Route
const utility_1 = require("../controller/utility");
router.route("/status").get(utility_1.StatusRoute);
const user_1 = require("../controller/user");
router.route("/user").post(user_1.createUserProfile);
router.route("/user/likeevent").post(user_1.likeEvent);
router.route("/user/interestedevent").post(user_1.addInterested);
router.route("/user/reserveevent").post(user_1.reserveEvent);
router.route("/user/visitedevent").get(user_1.visitedEvents);
router.route("/user/addreview").post(user_1.addReviews);
router.route("/user/recommendation").post(user_1.getRecommendation);
router
    .route("/user/:userid")
    .get(user_1.getUserProfile)
    .delete(user_1.deleteUserProfile)
    .patch(user_1.updateProfile);
router.route("/user/settings").patch(user_1.changeSettings);
// Event Routes
const events_1 = require("../controller/events");
router.route("/events").post(events_1.getEvents);
router.route("/events/post").post(events_1.postEvent);
// trending events
router.route("/events/trending").get(user_1.getTrendingActivity);
exports.default = router;
