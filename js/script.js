"use strict"

// Giphy API key: bfeb7254f14c49bda91dfb078a370b0c


// The initial search button values are stored in this array
var buttons = ["GOB", "Buster", "Michael", "George Sr.", "Lucille", "Lindsay", "George Michael", "Tobias", "Maebe", "Ann", "Steve Holt"];
var apiKey = "bfeb7254f14c49bda91dfb078a370b0c";



function drawInput() {

var input = $("<form/>").attr("id", "input-form");
var label = $("<label>").attr("for", "input-text").text("Create your own");
var textBox = $("<input>").attr("type", "text").attr("id", "input-text");
var button = $("<input>").attr("type", "submit").attr("id", "input-submit").attr("value", "Add");
$("#searchPanel").append(input);
input.append(label).append(textBox).append(button);

}
//make a button for each item in the array
function drawButtons() {
	buttons.forEach(function(arr){
		var button = $("<button/>").addClass("btn btn-default searchButton").attr("value", arr).text(arr);
		$("#buttonHome").append(button);
	})
}



// The function to be called when a button is clicked. Use the button text to call 
// giphy search API, adding "arrested development to the search terms"
function getGifs() {
	$("#gifPanel").empty();
	var picked = $(this).attr("value");
	var search = picked.replace(" ", "+") + "+arrested+development";
	console.log(search);
	//build the query URL based on the text of the button clicked
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";
	//make the API call
	$.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    	// for each of the 10 returned results, create a container with the gif (hidden), still image, and rating within
    	console.log(response);
    	for (var i = 0; i < 10; i++) {
	    	var gifBox = $("<div class='gifBox col-xs-12 col-sm-6 col-md-4 col-lg-3'/>");
	    	var gif = $("<img>").attr("src", response.data[i].images.fixed_width.url).addClass("gif hidden");
	    	var still = $("<img>").attr("src", response.data[i].images.fixed_width_still.url).addClass("gif");
	    	var rating = $("<h4>").text("rating: " + response.data[i].rating);
	    	$("#gifPanel").append(gifBox);
	    	gifBox.append(gif);
	    	gifBox.append(still);
	    	gifBox.append(rating);
    	}
    })
}

// "play" and "pause" by toggling which one of the animated gif or still image is hidden
function playPause() {
	$(this).children("img").toggleClass("hidden");
}

drawButtons();

drawInput();

$(document).on("click", ".searchButton", getGifs);

$(document).on("click", ".gifBox", playPause);
