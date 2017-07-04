"use strict"

// Giphy API key: bfeb7254f14c49bda91dfb078a370b0c


// The initial search button values are stored in this array
var buttons = ["GOB", "Buster", "Michael", "George Sr.", "Lucille", "Lindsay", "George Michael", "Tobias", "Maebe", "Ann", "Steve Holt"];
var apiKey = "bfeb7254f14c49bda91dfb078a370b0c";



//make a button for each item in the array
buttons.forEach(function(arr){
	var button = $("<button/>").addClass("btn btn-default movie").attr("value", arr).text(arr);
	$("#buttonHome").append(button);
})

// The function to be called when a button is clicked. Use the button text to call 
// giphy search API, adding "arrested development to the search terms"
function getGifs() {
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
    	// for each of the 10 returned results, create a container with the gif and rating within
    	for (var i = 0; i < 10; i++) {
    		console.log(response.data[i].url);
	    	var gifBox = $("<div class='gifBox col-xs-12 col-sm-6 col-md-4 col-lg-3'/>");
	    	var gif = $("<img>").attr("src", response.data[i].images.fixed_height.url);
	    	var rating = $("<h4>").text("rating: " + response.data[i].rating);
	    	$("#gifPanel").append(gifBox);
	    	gifBox.append(gif);
	    	gifBox.append(rating);
    	}
    })
}

$(document).on("click", ".movie", getGifs);
