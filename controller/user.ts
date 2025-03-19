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
} from "../db/db_connect";
import { Op } from "sequelize";

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { name, email, mobilenumber, interests } = req.body;
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

    // Store the file path, not the signed URL
    await user.update({
      profile_img: `https://oplsgvveavucoyuifbte.supabase.co/storage/v1/object/public/neom-images/${signedUrlData.path}`,
    });

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
      data: user,
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

// change the settings of user given the body parameters
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
    const user = await Auth.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "Users123 not found" });
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

    await user.update({ updateSetting });
    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      updated_fields: updateSetting,
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
    const user = await User.findOne({ where: { id: user_id } });
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
export const fetchVisitedEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId: user_id } = req.user;
    const { event_id, date, time, location, event_type } = req.body;
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
      event_name,
      event_id,
      location,
      event_category,
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
        username: user.name,
        comment,
        date: new Date(),
        time: new Date().toLocaleTimeString(),
        location,
        event_category,
        event_name,
        rating,
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

    const reviews = await Reviews.findAll({
      where: query,
      limit: 20,
    });
    if (!reviews) {
      res.status(404).json({ success: false, message: "No reviews found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      reviews: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};

// recommendation
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
    const recommendation = await Recommendations.findAll({
      limit: 10,
    });
    if (!recommendation) {
      res.status(404).json({
        success: false,
        message:
          "Please add your interest in setting to let us find some suggestion for you",
      });
      return;
    }
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

// trending activity
export const getTrendingActivity = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await TrendingActivity.findAll({
      limit: 10,
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
    const { userId: user_id } = req.user;
    const reservedEvents = await ReservedEvent.findAll({
      where: { user_id },
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
