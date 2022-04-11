import 'dotenv/config';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Development from '../models/development.js';
import Hackathon, {HackathonEntry} from '../models/hackathon.js';

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.vql6v.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    runApp();
})
.catch((err) => {
    console.log(err);
});

const axinstance = axios.create({
    baseURL: 'http://localhost:3001/',
});

const args = process.argv.slice(2);

function generateRandomUsers(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        users.push({
            firstName: firstName,
            lastName: lastName,
            email: faker.internet.exampleEmail(firstName, lastName),
            location: `${faker.address.city}, ${faker.address.country}`,
            avatarUrl: faker.internet.avatar(),
            username: faker.internet.userName(firstName, lastName),
        });
    }
    return users;
}

function generateHackathonEntries(users) {
}


function generateRandomHackathon(users) {
    const random_boolean = Math.random() < 0.4;
    const location = random_boolean ? `${faker.address.city}, ${faker.address.country}` : 'Remote';
    const suffixes = [' Event', ' Hackathon', ' Hacker Meetup', 'Con', ''];
    const hackathon = {
        name: `${faker.hacker.adjective()} ${faker.hacker.noun()}${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
        description: faker.lorem.paragraph(),
        startDate: faker.date.future(),
        location: location,
    };
    return hackathon;
}

function runApp() {



}