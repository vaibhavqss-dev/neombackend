import { Request, Response } from "express";
import { Event } from "../db/db_connection";
import { getCurrentTime } from "./utility";

// Postevent
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
    } = _req.body;
    // Format the time to ensure it's in valid HH:MM:SS format

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
    const { category, title, time, date } = _req.query;
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

    if (Object.keys(filter_event).length === 0) {
      const events = await Event.findAll({ limit: 10 });
      res.status(200).json({ success: true, data: events, isFiltered: false });
      return;
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
