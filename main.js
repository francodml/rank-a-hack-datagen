import { faker } from '@faker-js/faker';
import axios from 'axios';

const axinstance = axios.create({
    baseURL: 'http://localhost:3001/api',
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
            location: faker.address.country(),
            avatarUrl: faker.internet.avatar(),
            username: faker.internet.userName(firstName, lastName),
        });
    }
    return users;

}

function generateHackathonEntries(user_ids) {

    const entries = [];
    user_ids.forEach(u => {
        entries.push({
            name: `${faker.hacker.noun()} ${faker.hacker.ingverb()}`,
            description: faker.hacker.phrase(),
            developerId: u,
            ranking: Math.random() * (10 - 5) + 5,
        });
    });
    return entries;

}


function generateRandomHackathon(entries) {

    const random_boolean = Math.random() < 0.4;
    const random_date = faker.date.past();
    const location = random_boolean ? `${faker.address.country()}` : 'Remote';
    const suffixes = [' Event', ' Hackathon', ' Hacker Meetup', '-con', '', ` ${random_date.getFullYear()}`];
    const names = [`${faker.hacker.noun()} ${faker.hacker.ingverb()}`, `${faker.company.companyName()}`, `${faker.address.cityName()}`]
    const hackathon = {
        name: `${names[Math.floor(Math.random() * names.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
        description: faker.lorem.paragraph(),
        startDate: random_date,
        location: location,
        entries: entries,
    };
    return hackathon;

}

function runApp(args) {

    //Generate random users, and expect their userIds in the POST response
    const users = generateRandomUsers(10);
    var user_ids = [];
    //post all users in bulk
    axinstance.post('/users', users)
        .then(res => {
            console.log(res.status);
            user_ids = res.data

            const entries = generateHackathonEntries(user_ids);

            console.log(entries);
        
            const hackathon = generateRandomHackathon(entries);
        
            //post the hackathon to the backend
            axinstance.post('/hackathons', hackathon)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
        
}