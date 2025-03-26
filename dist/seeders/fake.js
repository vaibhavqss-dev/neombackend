"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connect_1 = require("../db/db_connect");
const { Faker, en } = require("@faker-js/faker");
const db_connect_2 = require("../db/db_connect");
const faker = new Faker({ locale: [en] });
const generateEvent = () => ({
    title: `${faker.lorem.words(3)} Event`,
    description: faker.lorem.paragraph(),
    subtext: faker.lorem.sentence(5),
    date: [faker.date.future().toISOString().split("T")[0]],
    time: [
        `${faker.number.int({ min: 8, max: 18 })}:00-${faker.number.int({
            min: 19,
            max: 23,
        })}:00`,
    ],
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    location: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}`,
    category: faker.helpers.arrayElement([
        "Music",
        "Technology",
        "Food",
        "Sports",
        "Art",
    ]),
    image_urls: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.image.url()),
    overall_rating: faker.number.int({ min: 50, max: 100 }),
    avg_rating: parseFloat(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
    no_reviews: faker.number.int({ min: 10, max: 500 }),
    min_temperature: faker.number.float({ min: 5, max: 20, fractionDigits: 2 }),
    max_temperature: faker.number.float({ min: 20, max: 40, fractionDigits: 2 }),
    operator_name: faker.number.int({ min: 0, max: 1 })
        ? faker.company.name()
        : null,
    available_seats: faker.number.int({ min: 0, max: 1 })
        ? faker.number.int({ min: 50, max: 5000 })
        : null,
});
const populateDatabase = async (count = 10000) => {
    try {
        await db_connect_1.sequelize.sync({ force: false });
        const events = Array.from({ length: count }, generateEvent);
        await db_connect_2.Event.bulkCreate(events, { validate: true });
        console.log(`Successfully inserted ${count} events.`);
    }
    catch (error) {
        console.error("Error populating database:", error);
    }
    finally {
        await db_connect_1.sequelize.close();
    }
};
populateDatabase(10000);
