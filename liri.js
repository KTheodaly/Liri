
require("dotenv").config();

const request = require("request");
const keys = require("./keys");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require("moment");


const searchCommand = process.argv[2];
const searchTerm = process.argv.slice(3).join(" ");


if (searchCommand == "movie-this") {
    // Store arguments in an array

    let nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    let movieName = searchTerm;

    movieName = nodeArgs.slice(3).join(" ")
    console.log(movieName);


    // run a request to the OMDB API
    const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    request(queryUrl, function (error, response, body) {
        /*same issue as below, for the default, I want to set it her that 
        if (!movieName){
            searchTerm = "Mr. Nobody"
        } but I can't get it to function quite right, might be missing something */
        if (!error && response.statusCode === 200) {

            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        };
    });
};


if (searchCommand == "spotify-this-song") {

    let nodeArgs = process.argv;

    let songName = searchTerm;
    /*this is where I want to add the default, something like 
    if (!searchTerm) {
        songName = "The Sign"
    } but it messes up my code and I couldn't figure out where the default placements would work quite right*/

    songName = nodeArgs.slice(3).join(" ")
    console.log(songName);

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Preview:', data.tracks.items[0].artists[0].external_urls.spotify);
    });
};
if (searchCommand == "do-what-it-says") {
    const doWhatItSays = function () {
        /*this function does not give me the commands I want, but I feel like all the syntax is right I don't want to mess it up and break it more. I'm trying to read the random.txt file and enter the two inputs into argv format in an array so the program reads it the same as a user input*/
        fs.readFile("random.txt", "utf8", function (error, data) {
            console.log(data);
            var dataArr = data.split(",");
            if (dataArr.length === 2) {
                pick(dataArr[0], dataArr[1]);
            } else if (dataArr.length === 1) {
                pick(dataArr[0]);
            }
        });

    }
}

if (searchCommand == "concert-this") {

    let nodeArgs = process.argv;

    let concertName = searchTerm;
    let bandAPI = "concerts.bandAPI";

    concertName = nodeArgs.slice(3).join(" ")
    console.log(concertName);
    var queryURL = "https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=" + bandAPI;

    console.log("qUrlc", queryURL);

    request(queryURL, function (err, res, body) {
        if (err) throw err;

        let json = JSON.parse(body);

        for (let i = 0; i < json.length; i++) {


            console.log(`Band name: ${json[i].lineup}\nVenue: ${json[i].venue.name}\nVenue City: ${json[i].venue.city}\nDate: ${moment(json[i].datetime).format("MM/DD/YYYY")}\nURL: ${json[i].url}\n\n\n`);

        };

    });

};
