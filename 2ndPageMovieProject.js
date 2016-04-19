//All code in this file was researched and created by me

var omdbAPIcall = function(MovieChoice){
    var url = "http://www.omdbapi.com/?t=" + MovieChoice; //set url for API call from first page movie
    
    //this method calls the API and requests the data in JSON format           
   $.ajax({url: url, data: 'json', async: false, success: function (json) {
        var image = json.Poster;
         //check to see if user entered in a real movie and not jibberish
        if(json.Response == "False"){
            alert("That movie was not in the database or does not exist, please try again.");
            return;
        }
        //if movie has no poster with the data then a "no poster found" image is displayed
        //noPoster.png was created by me using Google Draw
        if(json.Poster == "N/A"){
            $("#poster").attr('src', "ratings/NoPoster.png").show('slide', {direction: 'right'}, 1500);
        }
        else{
           $("#poster").attr('src', json.Poster).show('slide', {direction: 'right'}, 1500); 
        }
        $("#title").append(json.Title).show('slide', {direction: 'left'}, 1500);
        $("#year").append( json.Year).show('slide', {direction: 'left'}, 1500);
        $("#imdbRating").append( json.imdbRating+" stars").show('slide', {direction: 'left'}, 1500);
        $("#runtime").append(json.Runtime).show('slide', {direction: 'left'}, 1500);
        $("#genre").append(json.Genre).show('slide', {direction: 'left'}, 1500);
        $("#director").append(json.Director).show('slide', {direction: 'left'}, 1500);
        $("#actors").append(json.Actors).show('slide', {direction: 'left'}, 1500);
        $("#plot").append(json.Plot).show('slide', {direction: 'left'}, 1500);
    }});//end of ajax call


};//end of function call

$(document).ready( function () {
    var posterToShow;    

    //if Session Storage has something in it, It can only movie title data
    if(sessionStorage.getItem('MovieData').length > 0){
        posterToShow = sessionStorage.getItem('MovieData'); //set the poster as the selected poster
        omdbAPIcall(posterToShow);
    }    
    //this function gets the input from the user and replaces old movie in local storage for the browser session
    //this also checks for validation from the user to enter in a movie
    $("#secondPageInputButton").click(function(event){
        if(($("#secondPageInput").val() === "")||
           ($("#secondPageInput").val() === "undefined")) {
            alert("Please enter a movie title");
            event.preventDefault();
        }
        else{
            var secondPageInputMovie = $("#secondPageInput").val();
            posterToShow = sessionStorage.setItem('MovieData', secondPageInputMovie);
            omdbAPIcall(posterToShow);
        }
    });//end of second Page Input Button Click
});//end of document