$(document).ready(function() {
  
  // Character counter
  $("#tweet-text").on("input", function() {
    let length = $(this).val().length;
    let counter = $(this).siblings("div").find("output");
    counter.html(140-length);
    if (140 - length < 0) {
      counter.addClass("toggleRed");
    }
    else {
      counter.removeClass("toggleRed");
    }
  });
  
});

