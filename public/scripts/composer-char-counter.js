$(document).ready(function() {
  
  $("#tweet-text").on("input", function() {
    // console.log(this);
    // console.log($(this).siblings("div").find("output"));
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

