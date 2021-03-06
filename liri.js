require("dotenv").config();
let axios = require('axios')
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let inquirer = require("inquirer");
let fs = require("fs");
let moment = require("moment");

inputLine();

function inputLine() {
    inquirer.prompt([
        {
            type: "input",
            name: "input",
            message: 'Input a command and your search:'
        }
    ]).then(function (result) {
        let rawInput = result.input + "\n";
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
        else if (command === "do-what-it-says" || command === "random" || command === "r") {
            randomThis();
        }
        else {
            console.log("Command not recognized!");
            inputLine();
        }

        function log() {
            fs.appendFile("log.txt", rawInput, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }).catch(function (error) {
        console.log(error);
    });
}


function spotifyThis(terms) {
    if (!terms) {
        terms = "The Sign";
    }
    spotify.search({ type: 'track', query: terms, limit: 5 })
        .then(function (response) {
            let tracks = response.tracks;
            for (let i = 0; i < tracks.items.length; i++) {
                console.log("\n");
                console.log("~~~~~~~~~~~~~~~ SONG INFO ~~~~~~~~~~~~~~~\n");
                console.log("Artist name: " + tracks.items[i].artists[0].name + "\n");
                console.log("Song title: " + tracks.items[i].name + "\n");
                console.log("Album name: " + tracks.items[i].album.name + "\n");
                console.log("Preview link: " + tracks.items[i].preview_url + "\n");
            }
            inputLine();
        })
}

function concertThis(terms) {
    if (!terms) {
        terms = "Built to Spill";
    }
    axios.get("https://rest.bandsintown.com/artists/" + terms + "/events?app_id=codingbootcamp")
        .then(function (response) {
            let concerts = response.data;

            for (let i = 0; i < 5; i++) {
                console.log("\n");
                console.log("~~~~~~~~~~~~~~~ EVENT INFO ~~~~~~~~~~~~~~~\n");
                console.log("Artist: " + concerts[i].lineup + "\n")
                console.log("Venue Name: " + concerts[i].venue.name + "\n");
                console.log("Venure Location: " + concerts[i].venue.city + ", " + concerts[i].venue.region + ", " + concerts[i].venue.country + "\n");
                console.log("Date: " + moment(concerts[i].datetime, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY'));
            }
            inputLine();
        })
        .catch(function (error) {
            console.log(error);
        })
}

function movieThis(terms) {
    if (!terms) {
        terms = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?apikey=812d4567&t=" + terms)
        .then(function (response) {
            let info = response.data;
            console.log("\n");
            console.log("~~~~~~~~~~~~~~~ MOVIE INFO ~~~~~~~~~~~~~~~\n");
            console.log("Title: " + info.Title + "\n");
            console.log("Released: " + moment(info.Released, 'DD MMM YYYY').format('MM/DD/YYYY') + "\n");
            console.log("IMDB Rating: " + info.Ratings[0].Value + "\n");
            console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value + "\n");
            console.log("Produced in: " + info.Country + "\n");
            console.log("Language: " + info.Language + "\n");
            console.log("Plot Synopsis: " + info.Plot + "\n");
            console.log("Cast: " + info.Actors);
            inputLine();
        })
        .catch(function (error) {
            console.log(error);
        })

}

function randomThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        let input = data.split(",");
        let command = input[0].toLowerCase();
        let terms = input.slice(1).join(" ").toLowerCase();

        if (command === "spotify-this-song" || command === "spotify" || command === "s") {
            spotifyThis(terms);
        }
        else if (command === "concert-this" || command === "concert" || command === "c") {
            concertThis(terms);
        }
        else if (command === "movie-this" || command === "movie" || command === "m") {
            movieThis(terms);
        }

        inputLine();
    });
}