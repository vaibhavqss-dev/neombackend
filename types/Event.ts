import { Model, Optional } from "sequelize";

interface EventAttributes {
  event_id: number;
  title: string;
  description: string;
  subtext: string;
  date: string[];
  time: string[];
  latitude: number;
  longitude: number;
  category: string;
  location: string;
  image_urls: string[];
  overall_rating: number;
  min_temperature: number;
  max_temperature: number;
  avg_rating: number;
  no_reviews: number;
  operator_name?: string;
  available_seats?: number;
  createdAt?: Date;
  updatedAt?: Date;

  event_price?: number;
}

interface EventCreationAttributes
  extends Optional<EventAttributes, "event_id"> {}

export class Event extends Model<EventAttributes, EventCreationAttributes> {
  public async increaseNoReviews(event_id: number): Promise<boolean> {
    try {
      const event = await Event.findByPk(event_id);
      if (!event) {
        console.error("Event not found");
        return false;
      }

      const newValue = (event.get("no_reviews") as number) + 1;
      event.set("no_reviews", newValue);

      await event.save();
      console.log("Event no_reviews increased");
      return true;
    } catch (error) {
      console.error("Error increasing no_reviews:", error);
      return false;
    }
  }

  declare event_id: number;
  declare title: string;
  declare description: string;
  declare subtext: string;
  declare date: string[];
  declare time: string[];
  declare latitude: string;
  declare longitude: string;
  declare category: string;
  declare location: string;
  declare image_urls: string[];
  declare overall_rating: number;
  declare min_temperature: string;
  declare max_temperature: string;
  declare avg_rating: number;
  declare no_reviews: number;
  declare operator_name?: string;
  declare available_seats?: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare event_price?: number;
}
