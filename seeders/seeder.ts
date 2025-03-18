import { Event, Auth, User, Reviews } from "../db/db_connection";
import { events, signup, reviews } from "./data/data";

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

export const seedReviews = async () => {
  try {
    for (const reviewData of reviews) {
      console.log(`Creating review for event '${reviewData.event_name}'...`);
      try {
        const review = await Reviews.create(reviewData);
        console.log(`Review created with ID: ${review.id}`);
      } catch (err) {
        console.error(
          `Error creating review for event '${reviewData.event_name}':`,
          err
        );
      }
    }
  } catch (err) {
    console.error("Error seeding review data:", err);
  }
};
