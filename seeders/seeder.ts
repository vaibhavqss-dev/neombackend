import {
  Event,
  Auth,
  User,
  Reviews,
  ReservedEvent,
  TrendingActivity,
  Logs,
  Recommendations,
} from "../db/db_connect";
import {
  events,
  signup,
  reviews,
  reserved_events,
  trending_activity,
  logs,
  recommendations,
} from "./data/data";

export const seedsignup = async () => {
  try {
    for (const signupData of signup) {
      console.log(`Creating signup '${signupData.username}'...`);
      try {                               
        const [user, createdUser] = await User.findOrCreate({
          where: { name: signupData.name },
          defaults: {
            name: signupData.name,
            email: signupData.email,
            mobile_number: signupData.mobile_number,
            interests: ["music", "sports"],
            likes: ["event1", "event2"],
            profile_img: signupData.profile_img,
          },
        });
        const [signup, created] = await Auth.findOrCreate({
          where: { user_id: user.id },
          defaults: signupData,
        });

        if (created) {
          console.log(`signup created with ID: ${signup.id}`);
        } else {
          console.log(`signup '${signupData.username}' already exists.`);
        }
      } catch (err) {
        console.error(`Error creating signup '${signupData.username}':`, err);
      }
    }
  } catch (err) {
    console.error("Error seeding signup data:", err);
  }
};

export async function seedEvents() {
  console.log("Seeding events data...");

  try {
    for (const eventData of events) {
      console.log(`Creating event '${eventData.title}'...`);
      try {
        const [event, created] = await Event.findOrCreate({
          where: { title: eventData.title },
          defaults: eventData,
        });

        if (created) {
          console.log(`Event created with ID: ${event.id}`);
        } else {
          console.log(`Event '${eventData.title}' already exists.`);
        }
      } catch (err) {
        console.error(`Error creating event '${eventData.title}':`, err);
      }
    }

    console.log("Events seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding events data:", error);
  }
}

export const seedReservedEvents = async () => {
  try {
    for (const reservedEventData of reserved_events) {
      console.log(`Creating reserved event '${reservedEventData.event_id}'...`);
      try {
        const reservedEvent = await ReservedEvent.create(reservedEventData);
        console.log(`Reserved event created with ID: ${reservedEvent.id}`);
      } catch (err) {
        console.error(
          `Error creating reserved event '${reservedEventData.event_id}':`,
          err
        );
      }
    }
  } catch (err) {
    console.error("Error seeding reserved event data:", err);
  }
};

export const seedReviews = async () => {
  try {
    for (const reviewData of reviews) {
      try {
        const review = await Reviews.create(reviewData);
        console.log(`Review created with ID: ${review.id}`);
      } catch (err) {
        console.error("Error creating review:", err);
      }
    }
  } catch (err) {
    console.error("Error seeding review data:", err);
  }
};

export const seedTrendingActivity = async () => {
  try {
    for (const trendingActivityData of trending_activity) {
      try {
        const trendingActivity = await TrendingActivity.create(
          trendingActivityData
        );
        console.log(
          `Trending activity created with ID: ${trendingActivity.id}`
        );
      } catch (err) {
        console.error("Error creating trending activity:", err);
      }
    }
  } catch (err) {
    console.error("Error seeding trending activity data:", err);
  }
};

export const seedlogs = async () => {
  try {
    for (const logData of logs) {
      try {
        const log = await Logs.create(logData);
        console.log(`Log created with ID: ${log.id}`);
      } catch (err) {
        console.error("Error creating log:", err);
      }
    }
  } catch (err) {
    console.error("Error seeding log data:", err);
  }
};

export const seedRecommendations = async () => {
  try {
    for (const recommendationData of recommendations) {
      try {
        const recommendation = await Recommendations.create(recommendationData);
        console.log(`Recommendation created with ID: ${recommendation.id}`);
      } catch (err) {
        console.error("Error creating recommendation:", err);
      }
    }
  } catch (err) {
    console.error("Error seeding recommendation data:", err);
  }
};
