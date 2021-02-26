/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(tweet) {
    tweet.content.text = escape(tweet.content.text);
    console.log(tweet.content.text);
    const $tweet = $(`<article class="individual-tweet">
    <header>
    <div class="profile-info">
      <img class="pic" src=${tweet.user.avatars} width="100" height="100"> 
      <p class="display-name">${tweet.user.name}</p>
    </div>
    <div>
      <p class="username">${tweet.user.handle}</p>
    </div>
    </header>
    <div>
      <p name="text" class="textbox">${tweet.content.text}</p>
    </div>
    <div class="footer-elements">
      <p class="timestamp">${moment(tweet.created_at).toNow()}</p>
      <p class="flag-rt-like">⚑ ♺ ♥︎</p>
    </div>
    </article>`);
    return $tweet;
  }

  // Load tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
        console.log(tweets);
        renderTweets(tweets);
      })
  }
 
  // Render tweets
  const renderTweets = function(tweets) {
    $('.tweet-container').empty();
    for (let i = 0; i < tweets.length; i++) {
      let $tweet = createTweetElement(tweets[i]);
      $('.tweet-container').prepend($tweet);
    }
  }

  // Submit tweet
  $(".form-inline").on('submit', function (event) {
    console.log('Button clicked, performing ajax call...');
    event.preventDefault();
    if (!$("#tweet-text").val()) {
      $(".error").empty();
      $(".error").append($("<p>⚠︎ Tweet cannot be blank ⚠︎</p>"));
    } else if ($("#tweet-text").val().length > 140) {
      $(".error").empty();
      $(".error").append($("<p>⚠︎ Tweet is too long ⚠︎</p>"));
    } else {
      $(".error").empty();
      $.ajax({
        url: "/tweets", 
        method: 'POST',
        data: $(this).serialize()})
      .then(function () {
        console.log('Success: ');
        loadTweets();
    });
    };
  });
  console.log(loadTweets());
});