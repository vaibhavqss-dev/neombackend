import { Request, Response } from "express";
import {
  Auth,
  User,
  ReservedEvent,
  Reviews,
  Event,
  Logs,
  Recommendations,
  TrendingActivity,
  Setting,
  Notifications,
} from "../db/db_connect";
import { Op } from "sequelize";

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { name, email, mobilenumber, interests, dob, profile_img } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const updateData: any = {};
    updateData.id = user_id;
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (mobilenumber !== undefined) updateData.mobilenumber = mobilenumber;
    if (interests !== undefined) updateData.interests = interests;
    if (dob !== undefined) updateData.dob = dob;
    if (profile_img !== undefined) updateData.profile_img = profile_img;

    await user.update(updateData);
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      updated_fields: updateData,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

import { getSignedUrl } from "../services/get_signed_url";
import { Vibometer } from "../db/db_config";
import user from "../models/user";

export const updateProfile_img = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { profile_img_name } = req.body;

    if (!profile_img_name) {
      res.status(400).json({
        success: false,
        message: "Profile image name is required",
      });
      return;
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const signedUrlData = await getSignedUrl(
      user_id.toString(),
      profile_img_name
    );

    if (!signedUrlData) {
      res.status(500).json({
        success: false,
        message: "Failed to generate upload URL. Please check server logs.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Profile image upload URL generated successfully",
      uploadUrl: signedUrlData.signedUrl,
      publicUrl: `https://oplsgvveavucoyuifbte.supabase.co/storage/v1/object/public/neom-images/${signedUrlData.path}`,
    });
  } catch (error) {
    console.error("Error updating user profile image:", error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      profile: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user" });
  }
};

export const deleteUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    await user.destroy();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// get user settings
export const getUserSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const user = await Auth.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const settings = await Setting.findOne({ where: { user_id } });
    if (!settings) {
      res.status(404).json({ success: false, message: "Settings not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Settings retrieved successfully",
      settings: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve settings" });
  }
};

export const changeSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const {
      personalandAccount,
      operator,
      managedata,
      password_security,
      notification_email,
      notification_sms,
      notification_personalized,
      language,
    } = req.body;
    const setting = await Setting.findOne({ where: { user_id } });
    if (!setting) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const updateSetting: any = {};
    if (personalandAccount !== undefined)
      updateSetting.personalandAccount = personalandAccount;
    if (operator !== undefined) updateSetting.operator = operator;
    if (managedata !== undefined) updateSetting.managedata = managedata;
    if (password_security !== undefined)
      updateSetting.password_security = password_security;
    if (notification_email !== undefined)
      updateSetting.notification_email = notification_email;
    if (notification_sms !== undefined)
      updateSetting.notification_sms = notification_sms;
    if (notification_personalized !== undefined)
      updateSetting.notification_personalized = notification_personalized;
    if (language !== undefined) updateSetting.language = language;

    const updatedSettings = await setting.update(updateSetting);
    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      updated_fields: updateSetting,
      updatedSettings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update settings" });
  }
};

export const likeEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.user);
    const { userId: user_id } = req.user;
    const { event_id } = req.body;
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    let isOk = await user.addLikedEvent(event_id);
    if (!isOk) {
      res.status(400).json({ success: false, message: "Event already liked" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Event Added to liked events successfully",
    });
  } catch (error) {
    console.error("Error liking event:", error);
    res.status(500).json({ success: false, message: "Failed to like event" });
  }
};

export const UnlikeEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { event_id } = req.body;
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    let isOk = await user.UnlikeEvent(event_id);
    if (!isOk) {
      res
        .status(400)
        .json({ success: false, message: "No Event present with given Id" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Event removed from liked events successfully",
    });
  } catch (error) {
    console.error("Error unliking event:", error);
    res.status(500).json({ success: false, message: "Failed to unlike event" });
  }
};

export const getLikeEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;

    let likes = await User.findOne({
      where: { user_id: user_id },
      attributes: ["likes"],
    });

    if (!likes) {
      res.status(404).json({ success: false, message: "No liked events" });
      return;
    }

    const likedEvents = await Event.findAll({
      where: {
        event_id: {
          [Op.in]: likes.likes,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Liked events retrieved successfully",
      events: likedEvents,
    });
  } catch (error) {
    console.error("Error fetching liked events:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch liked events" });
  }
};

// add to interested events
export const addInterested = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { interest } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    let isAdded = await user.addInterested(interest);
    if (!isAdded) {
      res
        .status(400)
        .json({ success: false, message: "Interest already exists" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Event Added to interested events successfully",
    });
  } catch (error) {
    console.error("Error adding interested event:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add interested event" });
  }
};

//reserveEvents
export const reserveEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      event_id,
      date_from,
      date_to,
      event_name,
      no_of_guest,
      event_category,
    } = req.body;
    const { userId: user_id } = req.user;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    let isReserved = await ReservedEvent.create({
      user_id,
      event_id,
      date_from,
      date_to,
      event_name,
      no_of_guest,
      event_category,
    });
    if (!isReserved) {
      res
        .status(400)
        .json({ success: false, message: "Event already reserved" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Event Added to reserved events successfully",
    });
  } catch (error) {
    console.error("Error reserving event:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reserve event" });
  }
};

// visitedevents
export const getVisited = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    let isVisited = await ReservedEvent.findAll({
      where: {
        user_id,
        date_to: {
          [Op.lt]: new Date(),
        },
      },
      include: [
        {
          model: Event,
          required: true,
        },
        {
          model: Reviews,
          required: false,
          where: {
            user_id: user_id,
          },
        },
      ],
      limit: 20,
    });
    res.status(200).json({
      success: true,
      number: isVisited.length,
      message: "Visited events retrieved successfully",
      events: isVisited,
    });
  } catch (error) {
    console.error("Error visiting event:", error);
    res.status(500).json({ success: false, message: "Failed to visit event" });
  }
};

// addreviews
export const addReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const {
      quality_of_event,
      service_of_event,
      facilites_of_event,
      staffPoliteness,
      operator_of_event,
      event_id,
      comment,
    } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const rating =
      (quality_of_event +
        service_of_event +
        facilites_of_event +
        staffPoliteness +
        operator_of_event) /
      5;
    try {
      let isReviewed = await Reviews.create({
        user_id,
        event_id,
        comment,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        avg_rating: rating,
        quality_of_event,
        service_of_event,
        facilites_of_event,
        staffPoliteness,
        operator_of_event,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "SequelizeUniqueConstraintError"
      ) {
        res
          .status(400)
          .json({ success: false, message: "Event already reviewed" });
        return;
      }
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Event Added to reviewed events successfully",
    });
  } catch (error) {
    console.error("Error reviewing event:", error);
    res.status(500).json({ success: false, message: "Failed to review event" });
  }
};

// getreview
export const getReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { event_id } = req.query;
    const query: any = {};

    if (event_id) {
      query.event_id = event_id;
    }
    if (user_id) {
      query.user_id = user_id;
    }

    const reviews = await ReservedEvent.findAll({
      where: {
        ...query,
        date_to: {
          [Op.lt]: new Date(),
        },
      },

      include: [
        {
          model: Event,
          required: true,
          attributes: [
            "event_id",
            "title",
            "location",
            "category",
            "date",
            "description",
            "image_urls",
            "subtext",
            "avg_rating",
            "no_reviews",
          ],
          include: [
            {
              model: Reviews,
              required: false,
              where: {
                user_id: user_id,
              },
            },
          ],
        },
      ],
      limit: 5,
    });
    if (!reviews) {
      res.status(404).json({ success: false, message: "No reviews found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      event: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};

export const getRecommendation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const reservedEvents = await ReservedEvent.findAll({
      where: {
        user_id: userId,
      },
      attributes: ["event_id"],
    });
    const reservedEventIds = reservedEvents.map((event) => event.event_id);

    const recommendation = await Recommendations.findAll({
      limit: 5,
      include: [
        {
          model: Event,
          required: true,
          where:
            reservedEventIds.length > 0
              ? {
                  event_id: {
                    [Op.notIn]: reservedEventIds,
                    [Op.not]: user.likes,
                  },
                }
              : {},
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Recommendation retrieved successfully",
      event: recommendation,
    });
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve recommendation" });
  }
};

export const getTrendingActivity = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = _req.user;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const events = await TrendingActivity.findAll({
      where: {
        event_id: {
          [Op.not]: user.likes,
        },
      },
      limit: 5,
      include: [
        {
          model: Event,
          required: true,
        },
      ],
    });
    if (!events) {
      res.status(404).json({ success: false, message: "No trending events" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Trending events retrieved successfully",
      events: events,
    });
  } catch (error) {
    console.error("Error fetching trending events:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve trending events" });
  }
};

// reserveed events
export const getReservedEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const IsCoordinates = req.query.coordinates || false;
    const { userId: user_id } = req.user;
    const reservedEvents = await ReservedEvent.findAll({
      where: {
        user_id,
        date_to: {
          [Op.gt]: new Date(),
        },
      },
      include: [
        {
          model: Event,
          required: true,
        },
      ],
      limit: 20,
    });
    if (reservedEvents.length === 0) {
      res.status(404).json({ success: false, message: "No reserved events" });
      return;
    }

    if (IsCoordinates) {
      const coordinates = reservedEvents.map((event) => {
        return {
          event: event.event,
        };
      });
      res.status(200).json({
        success: true,
        message: "Reserved events retrieved successfully",
        events: coordinates,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Reserved events retrieved successfully",
      data: reservedEvents,
    });
  } catch (error) {
    console.error("Error fetching reserved events:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reserved events" });
  }
};

export const vibometer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { event_id, vibe } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    let isVibometer = await Vibometer.create({
      event_id,
      user_id,
      vibe,
    });

    if (!isVibometer) {
      res
        .status(400)
        .json({ success: false, message: "Vibometer already exists" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Vibometer Added successfully",
    });
  } catch (error) {
    console.error("Error adding vibometer:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add vibometer" });
  }
};

export const rescheduleEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { event_id, date, time, no_of_guest } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const reservedEvent = await ReservedEvent.findOne({
      where: { user_id, event_id },
    });
    if (!reservedEvent) {
      res.status(404).json({
        success: false,
        message: "Event not found in reserved events",
      });
      return;
    }

    await reservedEvent.update({ date, time, no_of_guest });
    res.status(200).json({
      success: true,
      message: "Event rescheduled successfully",
    });
  } catch (error) {
    console.error("Error rescheduling event:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reschedule event" });
  }
};

export const utility = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { event_id, utility } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    let isUtility = await Event.findOne({
      where: { event_id },
    });
    isUtility?.increaseNoReviews(event_id);
    res.status(200).json({
      success: true,
      message: "Utility Added successfully",
    });
  } catch (error) {
    console.error("Error adding utility:", error);
    res.status(500).json({ success: false, message: "Failed to add utility" });
  }
};

// update latitude and longitude
export const updateLatituteLongitude = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { curr_latitute, curr_longitude } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    await user.update({ curr_latitute, curr_longitude });
    res.status(200).json({
      success: true,
      message: "Latitude and Longitude updated successfully",
    });
  } catch (error) {
    console.error("Error updating latitude and longitude:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update latitude and longitude",
    });
  }
};

// get latitude and Longitude
export const getLatituteLongitude = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Latitude and Longitude retrieved successfully",
      curr_latitute: user.curr_latitute,
      curr_longitude: user.curr_longitude,
    });
  } catch (error) {
    console.error("Error fetching latitude and longitude:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve latitude and longitude",
    });
  }
};

// read notification
export const readNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { message_id } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const notification = await Notifications.findOne({
      where: { user_id, message_id },
    });
    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }
    const updated = await notification.update({ is_read: true });
    res.status(200).json({
      success: true,
      message: "Notification marked read successfully",
    });
  } catch (error) {
    console.error("Error reading notification:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to read notification" });
  }
};

// delete all notification
export const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    await Notifications.destroy({ where: { user_id } });
    res.status(200).json({
      success: true,
      message: "All Notifications deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete notification" });
  }
};
