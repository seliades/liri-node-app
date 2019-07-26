# LIRI Node App 

[Link to Video of Working Application]()

## Description
This LIRI Node application is a Language Interpretation and Recognition Interface that runs through the command line and utlizes JavaScript and several Node modules and APIs. LIRI accepts several commands and returns relavent information to the user based on the command and search query used. If you would like to clone this app you are welcome to, but you will need to supply your own Spotify API credentials in a `.env` file for it to work. On run will prompt for a command and your search, every word after command is the search parameters for the API requests sent out. Each search is logged to the log.txt file. After searching all returned information will then be displayed, and the app will continue to prompt.

## Commands Used & What is Returned
- "spotify-this-song"/"spotify"/"s": Takes a song name as search query and returns 5 songs that best match. Info displayed is the artist's name, song title, album title, and a link to a 30 second preview of the song via Spotify if available.
- "concert-this"/"concert"/"c": Takes a band name as search query and returns 5 upcoming concerts for that artist. Info displayed is the artist's name, name and location of the venue (city, region, & country), and the date of the concert. 
- "movie-this"/"movie"/"m": Takes a movie title as search query and returns most relevant movie result. Info displayed is the movie title, year of release, IMDB and Rotten Tomatoes ratings if available, country the movie was produced in, the langauage spoken, a plot synopsis, and the lead actors.
- "do-what-it-says"/"random"/"r": Pulls command and search query from `random.txt` file and runs applicable functions. The command and search query can be changed in the file.

## Modules Used
- node-spotify-api
- dotenv
- axios
- moment
- inquirer