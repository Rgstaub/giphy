"use strict"

// Giphy API key: bfeb7254f14c49bda91dfb078a370b0c


// The initial search button values are stored in this array
var buttons = ["GOB", "Buster", "Michael", "George Sr.", "Lucille", "Lindsay", "George Michael", "Tobias", "Maebe", "Ann", "Steve Holt"];
var apiKey = "bfeb7254f14c49bda91dfb078a370b0c";

// For this assignment I challenged myself to use jQuery to build all HTML elements

// Create the HTML elements that will provide structure for the page contents
var container = $("<div class='container-fluid'><div class='row'></div></div>");
$("body").prepend(container);
var logoPanel = $("<div id='logoPanel' class='col-xs-12 col-md-6'>");
logoPanel.html("<img src='images/logo.png' alt='arrested development logo'>");
var searchPanel = $("<div id='searchPanel' class='col-xs-12 col-md-6'>");
var buttonHome = $("<div id='buttonHome' class='col-xs-12 col-sm-3 col-md-2 col-lg-2'>");
var gifPanel = $("<div id='gifPanel' class='col-xs-12 col-sm-9 col-md-10 col-lg-10'>");
container.append(logoPanel).append(searchPanel).append(buttonHome).append(gifPanel);

// Create the HTML input form
var input = $("<form/>").attr("id", "input-form");
var label = $("<label>").attr({for:"input-text", id:"input-label"}).text("Add your own ");
var textBox = $("<input>").attr({type:"text", id:"input-text"});
var button = $("<input>").attr({type:"submit", id:"input-submit", value:"Add"}).addClass("btn btn-default btn-sm");
$("#searchPanel").append(input);
input.append(label).append(textBox).append(button);

$(document).ready(function() {

	// Clear any existing buttons and make a button for each item in the array
	function drawButtons() {
		$("#buttonHome").empty();
		buttons.forEach(function(arr){
			var button = $("<button/>").addClass("btn btn-default searchButton").attr("value", arr).text(arr);
			$("#buttonHome").append(button);
		})
	}

	// get the text from the input field, add it to the button array, and redraw the buttons
	function addButton() {
		var input = $("#input-text").val().trim();
		buttons.push(input);
		drawButtons();
		$("#input-text").val("");
	}

	// The function to be called when a button is clicked. Use the button text to call 
	// giphy search API, adding "arrested development to the search terms"
	function getGifs() {
		$("#gifPanel").empty();
		var picked = $(this).attr("value");
		var search = picked.replace(" ", "+") + "+arrested+development";
		//build the query URL based on the text of the button clicked
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";
		//make the API call
		$.ajax({
	        url: queryURL,
	        method: "GET"
	    }).done(function(response) {
	    	// for each of the 10 returned results, create a container with the gif (hidden), still image, and rating within
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

	// create the default buttons on load
	drawButtons();

	// When a button is clicked, make an API call based on the value of the button and display the results
	$(document).on("click", ".searchButton", getGifs);

	// When a gif is clicked, "play" or "pause" the gif
	$(document).on("click", ".gifBox", playPause);

	// When the input submit button is clicked, add a button based on the inpput text field
	$(document).on("click", "#input-submit", function(event) {
		event.preventDefault();
		addButton();
	});
})
