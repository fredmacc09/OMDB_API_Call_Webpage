//All code in this file was researched and created by me

$(document).ready( function() {
	var movies = ["The Martian", "Mad Max: Fury Road","Straight Outta Compton","Jurassic World","Guardians of the Galaxy", "Dawn Of The Planet Of The Apes", "Deadpool", "22 Jump Street","Fifty Shades of Grey", "The Wolf of Wall Street", "Big Hero 6", "Man of Steel","Finding Nemo","Inside Out","Pirates of the Caribbean : On Stranger Tides","The Hateful Eight","Creed","Furious 7","Avengers: Age of Ultron","Ant-Man","Minions","Despicable Me","Kill Bill","Anchorman 2"];    
	var url = "http://www.omdbapi.com/?t="; //url to call the movie from the OMDB API
	var fullURL, oldPoster;
	var posters = []; //array to hold the poster URL's

	for (var i = 0; i < movies.length; i++){ //for loop to cycle through the movies
		fullURL = url + movies[i]; //setting the url for API call

		//ajax method to specify criteria for API, mainly so that I can set the asyncronous value to false
		$.ajax({url: fullURL, data: 'json', async: false, success: function (json) {

			posters.push(json.Poster); //push the poster URL's into array
			for(var j = 0; j < posters.length; j++){ 
				$("#poster" + j).attr("src", posters[j]); //setting poster image
				$("#poster" + j).attr("id", movies[j]); //setting movie id value

			}
			//this function causes the image to change to the IMDB rating photo
			$("img").mouseenter(function(){
				var currentMovie = $(this).attr("alt"); //number of current movie
				oldPoster = posters[currentMovie];//previous image of poster before 'src' change
				switch(currentMovie){
					case '13': case '6': 
					$(this).attr("src", "ratings/8Halfstars.png");
					break;
					case '0': case '1': case '2': case '4': case '9': case '12': case '15': case '22': case '10':
					$(this).attr("src", "ratings/8stars.png");
					break;
					 case '5': case '16': case '18': case '21':
					$(this).attr("src", "ratings/7Halfstars.png");
					break;
					case '3': case '7': case '11': case '17': case '19':
					$(this).attr("src", "ratings/7stars.png");
					break;
					case '20':
					$(this).attr("src", "ratings/6Halfstars.png");
					break;
					case '14': case '23':
					$(this).attr("src", "ratings/6stars.png");
					break;
					case '8':
					$(this).attr("src", "ratings/4stars.png");
					break;
				}
				//when user clicks on image, the Movie ID is stored in a cookie for the window session.
				$(this).click(function(event) {
					var clickedMovie = $(this).attr("id");
					sessionStorage.setItem('MovieData', clickedMovie);
				});
			});//end of mouse enter

			//this method changes the poster back to its original self
			$("img").mouseleave(function(){
				$(this).css("opacity", "1");
				$(this).attr("src", oldPoster);
			});//end of mouse leave
		}});//end of ajax call
	}//end of for loop

	//this function gets the input from the user and saves it in local storage for the browser session on click
	//this also checks for validation from the user to enter in a movie
	$("#firstPageInputButton").click(function(event){
		if(($("#firstPageInput").val() === "")||
		   ($("#firstPageInput").val() === "undefined")){
			alert("Please enter a movie title");
			event.preventDefault();
		}
		else{
			var firstPageInputMovie = $("#firstPageInput").val();
			//setting the entered movie into local storage for current web session below
			sessionStorage.setItem('MovieData', firstPageInputMovie); 
		}
	});
});//end of document
