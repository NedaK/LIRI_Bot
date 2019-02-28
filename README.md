# LIRI_Bot


To see LIRI-Bot in action, check out these screen shots:

![node liri.js spotify-this-song good old days](ScreenShot_spotify.png/)
![node liri.js concert-this pink](ScreenShot_concert.png/)
![node liri.js movie-this mean girls](ScreenShot_movie.png/)
![node liri.js do-what-this-is](ScreenShot_doThis.png/)


     HOW TO USE LIRI_BOT:
1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY").

     * Time of the Event (formatted with moment).

     * Artist Name

     * If no song band is provided then your program will default to "Jusin Timberlake".

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

  

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'



4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    
     * The current lines in `random.txt` are as follows:
          movie-this,The Dark Crystal
          spotify-this-song,"I Want it that way"
          concert-this,Dashboard Confessional

      * It should run  `movie-this` for the Dark Crystal, `spotify-this-song` for "I Want it That Way," and `concert-this` for Dashboard Confessional.


### BONUS - Writing to a File

* In addition to logging the data to your terminal/bash window, LIRI_Bot will output the data to a .txt file called `log.txt`.

* The data is appended each time you run the liri.js file.

