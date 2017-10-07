var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "dc6zaTOxFJmzC";
var searchButton = "";
var topics = ["Jon Stewart", "Stephen Colbert", "Jim Carey", "Robin Williams", "Eddie Murphy", "Hank Hill", "Bart Simpson"];
var queryURL = "";
var imgURL = "";


function resetSearch () {
    $("#search-input").val("");
}


function searchGiphy (event) {
    event.preventDefault();

    searchButton = $("#search-input").val().trim();

    if (searchButton.length == 0) return;

    if (topics.indexOf(searchButton) > -1) {
        resetSearch();
        return;
    }

    topics.push(searchButton);
    createButtons();
 
    resetSearch();
}

// making "enter" key work
function searchKeypress (event) {
    if (event.keyCode === 13) {  
        searchGiphy(event);
    }
}



function createButtons() {
    
    $("#queries").empty();

  for (var i=0; i<topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("query-button");
    newButton.attr("data", topics[i]);
    newButton.text(topics[i]);
    $("#queries").append(newButton).append(" ").append(" ");
  }
}
createButtons();

function resetGiphyResults () {
    $("#giphy-results").empty();
}

function showClickCallout () {
    $(".click-callout").show();
}


// Displaying 9 giphs on button click
$(document).on("click", ".query-button", function(event) {
    event.preventDefault();

    showClickCallout();
    var topic = $(this).attr("data");
    var resultCount = 9;
    queryURL = baseURL + topic +"&limit=" + resultCount + "&api_key=" + apiKey;
    console.log(queryURL);
    resetGiphyResults();

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      // var gifRating = response.data[i].rating;


      var imgDiv;
      var imgElem;
      var gifRating;
      for (var i=0; i<9; i++) {
        imgURL = response.data[i].images.fixed_width_still.url;
        gifURL = response.data[i].images.fixed_width.url;
        gifRating = response.data[i].rating;
        // imgDiv = $("<div>")
        // imgDiv.addClass("image-div")
        imgElem = $("<img>");
        imgElem.attr("src", imgURL);
        imgElem.attr("data-still", imgURL);
        imgElem.attr("data-animate", gifURL);
        imgElem.attr("data-state", "still");
        imgElem.addClass("image-result");
        imgElem.html(gifRating);
        $("#giphy-results").append(imgElem);
      }
    });
  });


// changing the animation of the gifs
$(document).on("click", ".image-result", function(event) {
    event.preventDefault();

    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

    });