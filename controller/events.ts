import { Request, Response } from "express";
import { Event, ReservedEvent, Reviews, User } from "../db/db_connect";
import { getCurrentTime } from "./utility";
import { Op } from "sequelize";

export const postEvent = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      category,
      date,
      location,
      description,
      latitude,
      longitude,
      subtext,
      image_urls,
      overall_rating,
      min_temprature,
      max_temprature,
      avg_rating,
      no_reviews,
    } = _req.body;

    const formattedTime = getCurrentTime();
    const newEvent = await Event.create({
      title,
      category,
      time: formattedTime,
      date,
      location,
      description,
      latitude,
      longitude,
      subtext,
      image_urls,
      overall_rating,
      min_temprature,
      max_temprature,
      avg_rating,
      no_reviews,
    });
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("Error posting event:", error);
    res.status(500).json({ success: false, message: "Failed to post event" });
  }
};

export const getEvents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, title, time, date, location, event_id } = _req.query;
    const filter_event: any = {};
    if (category) {
      filter_event.category = category;
    }
    if (title) {
      filter_event.title = title;
    }
    if (time) {
      filter_event.time = time;
    }
    if (date) {
      filter_event.date = date;
    }
    if (location) {
      filter_event.location = location;
    }
    if (event_id) {
      filter_event.id = event_id;
    }

    if (event_id != null) {
      const event = await Event.findOne({
        where: { event_id: event_id },
        include: [
          {
            model: Reviews,
            required: false,
            attributes: ["comment", "user_id", "avg_rating", "createdAt", "id"],
            include: [
              {
                model: User,
                required: false,
                attributes: ["name", "email", "profile_img"],
              },
            ],
          },
        ],
      });
      res.status(200).json({ success: true, event: event });
      return;
    }

    const reservedEventIds = await ReservedEvent.findAll({
      attributes: ["event_id"],
      raw: true,
    });

    const reservedIds = reservedEventIds.map((item) => item.event_id);

    if (reservedIds.length > 0) {
      filter_event.event_id = {
        [Op.notIn]: reservedIds,
      };
    }

    const events = await Event.findAll({
      where: filter_event,
      limit: 10,
    });

    res.status(200).json({ success: true, data: events, isFiltered: true });
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({ success: false, message: "Failed to get events" });
  }
};

// UPDATE EVENT
export const updateEvent = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      event_id,
      time,
      title,
      category,
      date,
      location,
      description,
      latitude,
      longitude,
      subtext,
      image_urls,
      overall_rating,
    } = _req.body;
    const update: any = {};
    if (title) update.title = title;
    if (category) update.category = category;
    if (date) update.date = date;
    if (location) update.location = location;
    if (description) update.description = description;
    if (latitude) update.latitude = latitude;
    if (longitude) update.longitude = longitude;
    if (subtext) update.subtext = subtext;
    if (image_urls) update.image_urls = image_urls;
    if (overall_rating) update.overall_rating = overall_rating;
    if (time) update.time = time;

    if (Object.keys(update).length === 0) {
      res.status(400).json({
        success: false,
        message: "Please provide an event_id to update",
      });
      return;
    }

    const updatedEvent = await Event.update(update, {
      where: { id: event_id },
    });
    res.status(200).json({ success: true, messsage: "Event updated" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: "Failed to update event" });
  }
};

// delete event
export const deleteEvent = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { event_id } = _req.query;
    if (!event_id) {
      res.status(400).json({
        success: false,
        message: "Please provide an event_id to delete",
      });
      return;
    }
    await Event.destroy({ where: { id: event_id } });
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ success: false, message: "Failed to delete event" });
  }
};

