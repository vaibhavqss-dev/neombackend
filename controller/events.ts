import { Request, Response } from "express";
import { Event } from "../db/db_connection";

// postevent
export const postEvent = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      category,
      time,
      date,
      location,
      description,
      latitude,
      longitude,
      subtext,
      image_urls,
    } = _req.body;
    const newEvent = await Event.create({
      title,
      category,
      time,
      date,
      location,
      description,
      latitude,
      longitude,
      subtext,
      image_urls,
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
    const { category, name, time, date } = _req.body;
    const filter_event: any = {};
    if (category) {
      filter_event.category = category;
    }
    if (name) {
      filter_event.name = name;
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
    });
    res.status(200).json({ success: true, data: events, isFiltered: true });
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({ success: false, message: "Failed to get events" });
  }
};
