const readlineSync = require('readline-sync');
const { Client } = require ("pg");

//As your database is on your local machine, with default port,
//and default username and password,
//we only need to specify the (non-default) database name.
async function searchMovieCLI() {
const client = new Client({ database: 'omdb' });
await client.connect();

const userName = readlineSync.question('May I have your name? ');
console.log('Hi ' + userName + '! ' + 'Welcome to search-movies-cli!');

const searchedMovie = readlineSync.question('Search for what movie? (or "q" to quit):');
const text = "SELECT id, name, date, runtime, budget, revenue, vote_average, votes_count from movies WHERE name ilike $1"
const values = [`%${searchedMovie}%`]

const res = await client.query(text, values)
// console.log("Welcome to search-movies-cli!");

if (searchedMovie === 'q'){
    process.exit()
} else {
    console.table(res.rows )
}
}

searchMovieCLI();


 
// // Wait for user's response.
// const userName = readlineSync.question('May I have your name? ');
// console.log('Hi ' + userName + '!');
 
// // Handle the secret text (e.g. password).
// var favFood = readlineSync.question('What is your favorite food? ', {
//   hideEchoBack: true // The typed text on screen is hidden by `*` (default).
// });
// console.log('Oh, ' + userName + ' loves ' + favFood + '!');
