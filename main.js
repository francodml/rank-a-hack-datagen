import 'dotenv/config';
import { faker } from '@faker-js/faker';
import axios from 'axios';

const axinstance = axios.create({
    baseURL: 'http://localhost:3001/',
});

const args = process.argv.slice(2);

runApp(args);

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

function runApp(args) {



}