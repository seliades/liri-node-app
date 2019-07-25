require("dotenv").config();
const axios = require('axios')
var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var fs = require("fs");

function inputLine() {
    inquirer.prompt([
        {
            type: "input",
            name: "input",
            message: 'Input a command:'
        }
    ]).then(function (result) {
        let input = result.input.split(" ");
        let command = input[0].toLowerCase();
        let terms = input.slice(1).join(" ").toLowerCase();

        if (command === "spotify-this-song" || command === "spotify" || command === "s") {
            spotifyThis(terms); // Be sure to call the "inputLine()" function at the end of this function
            log(result.input); // This takes in the raw input if it is a valid command and logs it to the txt file
        }
        else if (command === "concert-this" || command === "concert" || command === "c") {
            concertThis(terms); // Be sure to call the "inputLine()" function at the end of this function
            log(result.input); // This takes in the raw input if it is a valid command and logs it to the txt file
        }
        else if (command === "movie-this" || command === "movie" || command === "m") {
            movieThis(terms); // Be sure to call the "inputLine()" function at the end of this function
            log(result.input); // This takes in the raw input if it is a valid command and logs it to the txt file
        }
        else if (command === "do-what-it-says" || command === "random" || command === "dwis" || command === "r") {
            randomThis(); // Be sure to call the "inputLine()" function at the end of this function
        }
        else {
            console.log("Command not recognized!");
            inputLine();
        }
    });
}


// function spotifyThis() {
//     spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }

//         console.log(data);
//     });
//     inputLine();
// }

function concertThis(terms) {
    axios.get("https://rest.bandsintown.com/artists/" + terms + "/events?app_id=codingbootcamp")
        .then(function (response) {
            let concerts = response.data;
            console.log(concerts);

            for (let i = 0; i < concerts.length; i++) {
                console.log("\n");
                console.log("~~~~~~~~~~~~~~~ EVENT INFO ~~~~~~~~~~~~~~~\n");
                console.log("Venue Name: " + concerts[i].venue.name + "\n");
                console.log("Venure Location: " + concerts[i].venue.city + ", " + concerts[i].venue.region + "," + concerts[i].venue.country + "\n");
                console.log("~~~~~~~~~~~~~~~ EVENT INFO ~~~~~~~~~~~~~~~\n");
                console.log("\n");
            }
        })
}

// function movieThis()

// function randomThis()

inputLine(); // Call this function on initialization and at the end of all your functions so the program doesn't close