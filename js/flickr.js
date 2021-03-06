//AJAX Call
var flickrURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var flickrOpts = {
    tags: "harrypotter",
    format: "json"
};
$.getJSON(flickrURL, flickrOpts, displayPhotos);

//Get photo info
function displayPhotos(data) {
  var photoHTML = '<ul id="flickrGallery">';
  $.each(data.items, function (i, photo){
    photoHTML += '<li>';
    photoHTML += '<img src="' + photo.media.m + '">';
    photoHTML += '<p class="hidden">' + photo.title + '</p>';
    photoHTML += '<p class="hidden">' + photo.date_taken + '</p>';
    photoHTML += '<p class="hidden">' + photo.author + '</p></li>';
    });
  photoHTML += '</ul>';
  $('#flickr').html(photoHTML);
}
// Photo info
$("#flickr").on("click", "li", function(item) {
  var item = $(this);
  var displayPhoto = item.children("img").attr("src");
  $('#overlay img').attr("src", displayPhoto);
  var displayTitle = item.children("p").eq(0).text();
  var displayDate = item.children("p").eq(1).text();
  var displayAuthor = item.children("p").eq(2).text();
  $('#overlay span').html("<p>" + "Title: " + displayTitle + "</p>" + "<p>" + "Date: " + displayDate + "</p/>" + "<p>" + "Author: " + displayAuthor + "</p/>");

  //Fade in the overlay
  $('#overlay').fadeIn(500);
});

//Sort by date button
$('#dateSort').click(function() {
  var flickrPhotos = $('#flickrGallery li');
  flickrPhotos.sort(mySortFunction);
  $('#flickrGallery').empty();
  $('#flickrGallery').append(flickrPhotos);

  function mySortFunction(a, b) {
    var text_a = $(a).children("p").eq(1).text();
    var text_b = $(b).children("p").eq(1).text();
      if (text_a < text_b) return -1;
      if (text_a > text_b) return 1;
      if (text_a == text_b) return 0;
    }
});
