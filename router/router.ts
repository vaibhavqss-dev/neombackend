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
  updateProfile_img,
  getUserSettings,
  getLikeEvent,
  UnlikeEvent,
  vibometer,
  rescheduleEvent,
} from "../controller/user";

router
  .route("/user/profile")
  .get(getUserProfile)
  .delete(deleteUserProfile)
  .patch(updateProfile);
router
  .route("/user/likeevent")
  .post(likeEvent)
  .get(getLikeEvent)
  .delete(UnlikeEvent);
router.route("/user/event/interested").post(addInterested);
router.route("/user/reserveevent").post(reserveEvent).get(getReservedEvents);
router.route("/user/visitedevent").get(fetchVisitedEvents);
router.route("/user/review").post(addReviews).get(getReviews);
router.route("/user/recommendation").get(getRecommendation);
router.route("/user/settings").patch(changeSettings).get(getUserSettings);
router.route("/user/profile/uploadimg").post(updateProfile_img);
router.route("/user/vibometer").post(vibometer);
router.route("/user/event/reschedule").patch(rescheduleEvent);

import { notification } from "../controller/notification";
router.route("/user/notification").get(notification);

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

router.route("/events/trending").get(getTrendingActivity);
export default router;
