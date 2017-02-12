//twitter stuff 
var twitter = require("twitter");
var keys = require("./keys.js");

var config = keys.twitterKeys;
var client = new twitter(config);//no idea if this is what is needed
//omdb
var request = require("request");
// spotify stuff
var spotify = require("spotify");
var nodeArgs = process.argv;
//do whatever
var fs = require("fs");

//userInput used for spotify and movie
var userInput = [];

for (var i = 3; i < nodeArgs.length; i++){
	userInput = userInput + " " + nodeArgs[i];
	}

/* initiate code */
var action = process.argv[2];
// var input = process.argv[3];//may not need this var 

switch (action) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    music();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    anything();
    break;
}

function tweet() {

	var params = {screen_name: 'merbedith', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (error) {
    	console.log(error);
    	return;
  	}
	for (var i = 0; i < tweets.length; i++){
		console.log("<<<<<<<<>>>>>>>>");
  		console.log(tweets[i].text);
	}
});
}//end of tweet

function music() {
	if (userInput.length > 0) {

	 spotify.search({ type: 'track', query: userInput }, function(err, data) {
     var output = data.tracks.items;
     if (err) {
        console.log('Error occurred: ' + err);
        return;
     }
     else {
       for (var i = 0; i < output.length; i++){
	   console.log("<<<<<<<<>>>>>>>>");
    	 for (var j = 0; j < output[i].artists.length; j++){
    		var artists = output[i].artists[j].name;
    		console.log("Artist: " + artists);

    	}//end of for loop through artists
     var albumName = output[i].album.name;
     var link = output[i].preview_url;
     var songTitle = output[i].name;
	 console.log("Album Name: " + albumName + "\nLink: " + link + "\nTitle: " + songTitle);
     }//end of i for loops for results
     }//end of else 
});//end of spotify search
	}
	else {
	// 	spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
 //     var output = data.tracks.items[0];
 //     console.log("Artist: " + output.artist[0].name + "\nAlbum Name: " + output.album.name + "\nLink: " + output.preview_url + "\nTitle: " + output.name)

	// });
	console.log("I don't know");
	}	
}//end of music

function movie() {
	request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json", function(error, response, body) {

  if (!error) {
  	console.log("<<<<<<<<>>>>>>>>");
  	console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
  	console.log("<<<<<<<<>>>>>>>>");
  }
  else {
  	console.log("Error: " + error);
  }
});
}//end of movie

function anything() {
	fs.readFile("random.txt", "utf8", function(error, data){
		var dataArr = data.split(",");
		userInput = dataArr[1];
		music(userInput);
	});
}//end of anything