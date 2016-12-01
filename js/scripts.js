//AJAX Call - OMDB
var omdbURL = "https://www.omdbapi.com/?s=harry+potter&r=json";
$.getJSON(omdbURL, displayFilms);

//Get info for film
function displayFilms(data) {
  var movieHTML = '<ul id="filmGallery">';
  $.each(data.Search, function (i, movie) {
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

//Put film photo on overlay
function showFilm(item) {
  var displayPoster = item.children("img").attr("src");
  $('#slideShow').attr("src", displayPoster);

  //Use movie ID to look up plot
  var displayID = item.children("p").first().text();
  var displayTitle = item.children("h3").text();
  var displayYear = item.children("p").last().text();
  var omdbURLById = "https://www.omdbapi.com/?i=" + displayID + "&r=json";
  $.ajax(omdbURLById, {
    complete: function(newXHR){
      var film = $.parseJSON(newXHR.responseText);
      $('#overlay span').html("<p>" + "Title: " + displayTitle + "</p>" + "<p>" + "Year: " + displayYear + "</p>" + "<p>" + "Plot: " + film.Plot + "</p>");
    }
  });

//Fade in the overlay
  $('#overlay').fadeIn(500);
}

// When Click on Movie Image, open overlay with data for that movie clicked
$("#film").on("click", "li", function (item) {
  var item_to_show = $(this);
  showFilm(item_to_show);
});

//Sort by year button
$('#yearSort').click(function() {
    var filmPhotos = $('#filmGallery li');
    $('#filmGallery').empty();
    filmPhotos.sort(mySortFunction);
    $('#filmGallery').append(filmPhotos);
    function mySortFunction(a, b) {
         var text_a = $(a).children("p").last().text();
         var text_b = $(b).children("p").last().text();
        if (text_a < text_b) return -1;
        if (text_a > text_b) return 1;
        if (text_a == text_b) return 0;
    }
});

//Exit overlay
$('#overlay').click(function() {
  $(this).fadeOut(500);
});
