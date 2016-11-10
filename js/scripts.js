
//AJAX Call - OMDB
var omdbURL = "https://www.omdbapi.com/?s=harry+potter&r=json";
$.getJSON(omdbURL, displayMovies);
    //Retrieve info for movie
    function displayMovies(data) {
        var movieHTML = '<ul id="filmGallery">';
        $.each(data.Search, function (i, movie){
           movieHTML += '<li>';
           movieHTML += '<img src="' + movie.Poster + '">';
           movieHTML += '<h3>' + movie.Title + '</h3>';
           movieHTML += '<p class="hidden">' + movie.imdbID + '</p>';
           movieHTML += '<p class="hidden">' + movie.Year + '</p></li>';
        });
        movieHTML += '</ul>';
        $('#film').html(movieHTML);
        $("li:nth-child(2)").hide();//img link is broken, this hides it
    }
