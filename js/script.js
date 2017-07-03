"use strict"

// Giphy API key: bfeb7254f14c49bda91dfb078a370b0c


// The initial search button values are stored in this array
var buttons = ["GOB", "Buster", "Michael", "George Sr.", "Lucille", "Lindsay", "George Michael", "Tobias", "Maebe", "Ann", "Steve Holt"];
var apiKey = "bfeb7254f14c49bda91dfb078a370b0c";



//make a button for each item in the array
buttons.forEach(function(arr){
	var button = $("<button/>").addClass("btn btn-default").attr("value", arr).text(arr);
	$("#buttonHome").append(button);
})



