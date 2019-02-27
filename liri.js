

  //require all needed modules to run LIRI_Bot
  require("dotenv").config();


  var keys = require("./keys.js");

 

  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);

  var axios = require("axios");
  var moment = require('moment');
  var fs = require("fs");

  //getBands function uses bandsintown api and axios to log search results to console
  //uses fs module to append seach results to a log.txt file
  function getBands(){

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
      function(response) {
        

        for (var i = 0; i<response.data.length; i++){

          var text = {
            venue: response.data[i].venue.name,
            city: response.data[i].venue.city,
            state: response.data[i].venue.region,
            date: response.data[i].datetime,
            name: response.data[i].lineup[0]
          }
          fs.appendFile("log.txt", JSON.stringify(text, null, 2), function(err){
            if(err){
              console.error(err);
            }
            else{
              console.log("Content Added!");
            }
          });

          console.log("------------------------------");
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city + ", " + response.data[i].venue.region);
          
          console.log(response.data[i].venue.country);
          console.log(moment(response.data[i].datetime).format("L"));
          console.log(moment(response.data[i].datetime).format("LT"));
          console.log(response.data[i].lineup[0]);
          console.log("-----------------------------");
          
        }
        //console.log(response.data.length);
    
    },

    function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    );
  }


  //getSongs function uses spotify api to log search results to console, and uses fs to append results to log.txt file
  function getSongs(){
      
    spotify.search({ type: 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
      for (var i = 0; i<data.tracks.items.length; i++){

        var text = {
          song_title: data.tracks.items[i].name,
          artist_name: data.tracks.items[i].album.artists[0].name,
          Spotify_url: data.tracks.items[i].album.artists[0].external_urls.spotify,
          album_name: data.tracks.items[i].album.name
        }
        fs.appendFile("log.txt", JSON.stringify(text, null, 2), function(err){
          if (err) {
            console.log(err);
          }
          else {
            console.log("Content Added!");
          }

        });

        
        console.log("*****************************************");
        console.log("Song Title: " + data.tracks.items[i].name);
        console.log("Artist name: " + data.tracks.items[i].album.artists[0].name); 
        console.log("Spotify url of song: " + data.tracks.items[i].album.artists[0].external_urls.spotify);

        console.log("Album name: " + data.tracks.items[i].album.name); 
      }
    
    });
  }

  //getMovie function uses omdb api and axios to log results to console and fs to save search results to log.txt file
  function getMovie(){
    
      axios.get("http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
          
          var text = {
            movie_title: response.data.Title,
            release_year: response.data.Year,
            imdb_rating: response.data.imdbRating,
            tomatoes_rating: response.data.Ratings[1].Value,
            country: response.data.Country,
            language: response.data.Language,
            plot: response.data.Plot,
            actors: response.data.Actors

          }
          fs.appendFile("log.txt", JSON.stringify(text, null, 2), function(err) {

            // If an error was experienced we will log it.
            if (err) {
              console.log(err);
            }
          
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              console.log("Content Added!");
            }
          
          });
          
          console.log("Movie Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country of production: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);

        }
      );
  }

  
  //if serching for concerts, use getBands function.  If no band is entered, default to justin timberlake.
  if (process.argv[2] === "concert-this"){

    if (process.argv[3]!==undefined){
      var artist = process.argv.slice(3).join("+");
    }
    else{
      var artist = "Justin+Timberlake";
    }
    
    getBands();

  }

  //if searching for songs, use getSong function.  If no song is entered, default to the sign by ace of base.
  if (process.argv[2] === "spotify-this-song"){

    
      if(process.argv[3]!== undefined){
        var song = process.argv.slice(3).join(" ");
      }
      else{
        var song = "the sign ace of base";
      }
    
      getSongs();
    
  }

  //if searching for movies, use getMovie function.  If no movie is entered, default to Mr. Nobody.
  if (process.argv[2] === "movie-this"){

    
    if (process.argv[3]!==undefined){
      var movie = process.argv.slice(3).join("+");
    }
    else{
      var movie = "Mr+Nobody";
    }

    getMovie();
    
  }
   
  //if do-what-it-says is entered, read data from random.txt and call appropriate functions.
  //data will be stored in log.txt file.  Random.txt file can have multiple lines of search possibilites,
  //but it must be in the specified format.
  if (process.argv[2] === "do-what-it-says"){

    fs.readFile("random.txt", "utf8", function(err, data){

      if (err){
        console.error(err);
      }
      else{
        //console.log(data);

        var lines = data.split("\n");
        
        lines.forEach(function(element) {
          

          var args = element.split(",");
          var whatFunction = args[0];
          var whatSearch = args[1];

          // console.log(whatFunction);
          // console.log(whatSearch);

            if(whatFunction === "concert-this"){
              artist = whatSearch.split(" ").join("+");
              //console.log(artist);
              getBands();
            }
            else if(whatFunction==="spotify-this-song"){
              song = whatSearch;
              getSongs();
            }
            else if(whatFunction==="movie-this"){
              movie = whatSearch;
              getMovie();
            } 

        });
      }
    });
  }
   