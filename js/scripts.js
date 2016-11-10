//OVERLAY
var $overlay = $('<div id="overlay"></div>');
var $card = $('<div id="card"></div>');
var $image = $("<img>");
var $caption = $("<span></span>");
//Append card to overlay
$overlay.append($card);

//Append image to overlay
$card.append($image);

//Append caption to overlay
$card.append($caption);

// Append overlay to body
$("body").prepend($overlay);

//AJAX Call - OMDB
var omdbURL = "https://www.omdbapi.com/?s=harry+potter&r=json";
$.getJSON(omdbURL, displayMovies);
//Get info for film
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
//Put film on overlay
function showFilm(item) {
  var displayPoster = item.children("img").attr("src");
  $('#overlay img').attr("src", displayPoster);

//Use movie ID to look up plot
  var displayID = item.children("p").first().text();
  var displayTitle = item.children("h3").text();
  var displayYear = item.children("p").last().text();
  var omdbURLById = "https://www.omdbapi.com/?i=" + displayID + "&r=json";
  var movie;
  $.ajax(omdbURLById, { //plot info by ID
    complete: function(newXHR){
      movie = $.parseJSON(newXHR.responseText);
      $('#overlay span').html("<p>" + "Title: " + displayTitle + "</p>" + "<p>" + "Year: " + displayYear + "</p>" + "<p>" + "Plot: " + movie.Plot + "</p>");
  }
});

//Fade in the overlay
  $overlay.fadeIn(500);
}

// When Click on Movie Image, open overlay with data for that movie clicked
$("#film").on("click", "li", function (item) {
  var item_to_show = $(this);
  showFilm(item_to_show);
});

//Exit overlay
$overlay.click(function() {
  $(this).fadeOut(500);
});
