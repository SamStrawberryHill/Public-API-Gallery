//AJAX Call
var flickrURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var flickrOpts = {
    tags: "harrypotter",
    format: "json"
};
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

$.getJSON(flickrURL, flickrOpts, displayPhotos);
//Overlay
function showPhoto(item) {
var item = $(item);
currentSlideshowEl = item.parent('ul');
var displayPhoto = item.children("img").attr("src");
$('#overlay img').attr("src", displayPhoto);
var displayTitle = item.children("p").eq(0).text();
var displayDate = item.children("p").eq(1).text();
var displayAuthor = item.children("p").eq(2).text();
$('#overlay span').html("<p>" + "Title: " + displayTitle + "</p>" + "<p>" + "Date: " + displayDate + "</p/>" + "<p>" + "Author: " + displayAuthor + "</p/>");

//Fade in the overlay
$overlay.fadeIn(500);
}
// Photo info
$("#flickr").on("click", "li", function(item) {
  var item_to_show = $(this);
  showPhoto(item_to_show);
});
