import { Request, Response } from "express";
import {
  Auth,
  User,
  ReservedEvent,
  VisitedEvent,
  Reviews,
  Event,
  Logs,
} from "../db/db_connection";

// already used with signup controller
export const createUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingUser = await Auth.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const user = await Auth.create({ username, password });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, mobilenumber, interest, userId } = req.body;

    // Check if user exists
    const user = await Auth.findByPk(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (mobilenumber !== undefined) updateData.mobilenumber = mobilenumber;
    if (interest !== undefined) updateData.interest = interest;

    await user.update(updateData);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userid;
    const user = await Auth.findByPk(userId);
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
    const userId = req.params.userid;
    const user = await Auth.findByPk(userId);
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
    const {
      user_id,
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

    await user.update({ updateSetting });
    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update settings" });
  }
};

// when user likes any event it's get's here
export const likeEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, event_id } = req.body;
    const user = await User.findByPk(user_id);
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
    const { user_id, interest } = req.body;
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
      user_id,
      event_id,
      date_from,
      date_to,
      name,
      no_of_guest,
      event_type,
    } = req.body;
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
      name,
      no_of_guest,
      event_type,
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
export const visitedEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_id, event_id, date, time, location, event_type } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    let isVisited = await VisitedEvent.create({
      user_id,
      event_id,
      date,
      time,
      location,
      event_type,
    });
    if (!isVisited) {
      res
        .status(400)
        .json({ success: false, message: "Event already visited" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Event Added to visited events successfully",
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
    const {
      user_id,
      quality_of_event,
      service_of_event,
      facilites_of_event,
      staffPoliteness,
      operator_of_event,
      event_name,
      event_id,
      review,
      location,
      event_type,
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
    let isReviewed = await Reviews.create({
      user_id,
      event_id,
      username: user.name,
      comment,
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      location,
      event_type,
      event_name,
      rating,
      review,
    });
    if (!isReviewed) {
      res
        .status(400)
        .json({ success: false, message: "Event already reviewed" });
      return;
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

// recommendation
export const getRecommendation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_id } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const recommendation = await Event.findAll({
      where: {
        category: user.interests.length == 0 ? "joy" : user.interests[0],
      },
      limit: 15,
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
      data: recommendation,
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
    const trending = await Logs.findAll({
      limit: 200,
    });

    const events = Event.findAll({
      where: {
        id: trending.map((event) => event.event_id),
      },
      limit: 20,
    });

    const trendingEventsMap = res.status(200).json({
      success: true,
      message: "Trending events retrieved successfully",
      data: events,
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
    const { userId } = req.user;
    const reservedEvents = await ReservedEvent.findAll({
      where: { user_id: userId },
      limit: 20,
    });
    if (!reservedEvents) {
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
