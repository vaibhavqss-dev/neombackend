import express from "express";
const router = express.Router();
import { StatusRoute } from "../controller/utility";
router.route("/status").get(StatusRoute);

import { loginUser, userSignup } from "../controller/auth";
router.route("/login").post(loginUser);
router.route("/signup").post(userSignup);

import { authMiddleWare } from "../middleware/authMiddleware";
router.use(authMiddleWare);
import { logsMiddleware } from "../middleware/logsMiddleware";
router.use(logsMiddleware);

import {
  createUserProfile,
  getUserProfile,
  deleteUserProfile,
  updateProfile,
  changeSettings,
  likeEvent,
  addInterested,
  reserveEvent,
  visitedEvents,
  addReviews,
  getRecommendation,
  getTrendingActivity,
  getReservedEvents,
} from "../controller/user";
router.route("/user").post(createUserProfile);
router.route("/user/likeevent").post(likeEvent);
router.route("/user/interestedevent").post(addInterested);
router.route("/user/reserveevent").post(reserveEvent).get(getReservedEvents);
router.route("/user/visitedevent").get(visitedEvents);
router.route("/user/addreview").post(addReviews);
router.route("/user/recommendation").post(getRecommendation);

import { notification } from "../controller/notification";
router.route("/user/notification").get(notification);
router
  .route("/user/:userid")
  .get(getUserProfile)
  .delete(deleteUserProfile)
  .patch(updateProfile);
router.route("/user/settings").patch(changeSettings);

// Event Routes
import { getEvents, postEvent } from "../controller/events";
router.route("/events").post(getEvents);
router.route("/events/post").post(postEvent);

// trending events
router.route("/events/trending").get(getTrendingActivity);
export default router;
