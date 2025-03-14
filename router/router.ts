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
  fetchVisitedEvents,
  addReviews,
  getRecommendation,
  getTrendingActivity,
  getReservedEvents,
  getReviews,
} from "../controller/user";
router.route("/user").post(createUserProfile);
router.route("/user/likeevent").post(likeEvent);
router.route("/user/interestedevent").post(addInterested);
router.route("/user/reserveevent").post(reserveEvent).get(getReservedEvents);
router.route("/user/visitedevent").get(fetchVisitedEvents);
router.route("/user/review").post(addReviews).get(getReviews);
router.route("/user/recommendation").get(getRecommendation);

import { notification } from "../controller/notification";
router.route("/user/notification").get(notification);
router
  .route("/user/:userid")
  .get(getUserProfile)
  .delete(deleteUserProfile)
  .patch(updateProfile);
router.route("/user/settings").patch(changeSettings);

// Event Routes
import {
  deleteEvent,
  getEvents,
  postEvent,
  updateEvent,
} from "../controller/events";
router
  .route("/events")
  .post(postEvent)
  .get(getEvents)
  .patch(updateEvent)
  .delete(deleteEvent);

// trending events
router.route("/events/trending").get(getTrendingActivity);
export default router;
