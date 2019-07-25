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
            message: 'Input a command and your search:'
        }
    ]).then(function (result) {
        let input = result.input.split(" ");
        let command = input[0].toLowerCase();
        let terms = input.slice(1).join(" ").toLowerCase();

        if (command === "spotify-this-song" || command === "spotify" || command === "s") {
            spotifyThis(terms);
            log(result.input);
        }
        else if (command === "concert-this" || command === "concert" || command === "c") {
            concertThis(terms);
            log(result.input);
        }
        else if (command === "movie-this" || command === "movie" || command === "m") {
            movieThis(terms);
            log(result.input);
        }
        else if (command === "do-what-it-says" || command === "random" || command === "dwis" || command === "r") {
            randomThis();
        }
        else {
            console.log("Command not recognized!");
            inputLine();
        }

    }).catch(function (error) {
        console.log(error);
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

            for (let i = 0; i < concerts.length; i++) {
                console.log("\n");
                console.log("~~~~~~~~~~~~~~~ EVENT INFO ~~~~~~~~~~~~~~~\n");
                console.log("Venue Name: " + concerts[i].venue.name + "\n");
                console.log("Venure Location: " + concerts[i].venue.city + ", " + concerts[i].venue.region + ", " + concerts[i].venue.country + "\n");
                console.log("~~~~~~~~~~~~~~~ EVENT INFO ~~~~~~~~~~~~~~~\n");
                console.log("\n");
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    inputLine();
}

function movieThis(terms) {
    axios.get("http://www.omdbapi.com/?apikey=812d4567&t=" + terms)
        .then(function (response) {
            let info = response.data;
            console.log("\n");
            console.log("~~~~~~~~~~~~~~~ MOVIE INFO ~~~~~~~~~~~~~~~\n");
            console.log("Title: " + info.Title + "\n");
            console.log("Released: " + info.Released + "\n");
            console.log("IMDB Rating: " + info.Ratings[0].Value + "\n");
            console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value + "\n");
            console.log("Produced in: " + info.Country + "\n");
            console.log("Language: " + info.Language + "\n");
            console.log("Plot Synopsis: " + info.Plot + "\n");
            console.log("Cast: " + info.Actors + "\n");
        })
        .catch(function (error) {
            console.log(error);
        })
    inputLine();
}

function randomThis()

inputLine();