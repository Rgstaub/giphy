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
    	console.log(response);
    	console.log(response.data[0].url);
    	var gif = $("<img/>").attr("src", response.data[0].images.fixed_height.url);
    	$("#gifPanel").append(gif);
    })
}

$(document).on("click", ".movie", getGifs);
