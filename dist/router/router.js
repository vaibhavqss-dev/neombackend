"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const utility_1 = require("../controller/utility");
router.route("/status").get(utility_1.StatusRoute);
const auth_1 = require("../controller/auth");
router.route("/login").post(auth_1.loginUser);
router.route("/signup").post(auth_1.userSignup);
const authMiddleware_1 = require("../middleware/authMiddleware");
router.use(authMiddleware_1.authMiddleWare);
const logsMiddleware_1 = require("../middleware/logsMiddleware");
router.use(logsMiddleware_1.logsMiddleware);
const user_1 = require("../controller/user");
router
    .route("/user/profile")
    .post(user_1.createUserProfile)
    .get(user_1.getUserProfile)
    .delete(user_1.deleteUserProfile)
    .patch(user_1.updateProfile);
router.route("/user/likeevent").post(user_1.likeEvent);
router.route("/user/event/interested").post(user_1.addInterested);
router.route("/user/reserveevent").post(user_1.reserveEvent).get(user_1.getReservedEvents);
router.route("/user/visitedevent").get(user_1.fetchVisitedEvents);
router.route("/user/review").post(user_1.addReviews).get(user_1.getReviews);
router.route("/user/recommendation").get(user_1.getRecommendation);
router.route("/user/settings").patch(user_1.changeSettings);
const notification_1 = require("../controller/notification");
router.route("/user/notification").get(notification_1.notification);
const events_1 = require("../controller/events");
router
    .route("/events")
    .post(events_1.postEvent)
    .get(events_1.getEvents)
    .patch(events_1.updateEvent)
    .delete(events_1.deleteEvent);
router.route("/events/trending").get(user_1.getTrendingActivity);
exports.default = router;
