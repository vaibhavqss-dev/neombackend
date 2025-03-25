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
  getVisited,
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
  utility,
  updateLatituteLongitude,
  getLatituteLongitude,
  readNotification,
  deleteNotification,
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
router.route("/user/visitedevent").get(getVisited);
router.route("/user/review").post(addReviews).get(getReviews);
router.route("/user/recommendation").get(getRecommendation);
router.route("/user/settings").patch(changeSettings).get(getUserSettings);
router.route("/user/profile/uploadimg").post(updateProfile_img);
router.route("/user/vibometer").post(vibometer);
router.route("/user/event/reschedule").patch(rescheduleEvent);
router
  .route("/user/location")
  .patch(updateLatituteLongitude)
  .get(getLatituteLongitude);

import { notification } from "../controller/notification";
router
  .route("/user/notification")
  .get(notification)
  .patch(readNotification)
  .delete(deleteNotification);
// router
//   .route("/user/notification")
//   .patch(readNotification)
//   .delete(deleteNotification);

import {
  deleteEvent,
  getEvents,
  postEvent,
  suggestAnotherEvent,
  updateEvent,
} from "../controller/events";
import { read } from "fs";
router
  .route("/events")
  .post(postEvent)
  .get(getEvents)
  .patch(updateEvent)
  .delete(deleteEvent);

router.route("/events/trending").get(getTrendingActivity);
router.route("/event/suggest_event/:event_id").get(suggestAnotherEvent);

router.route("/utility").post(utility);
export default router;
