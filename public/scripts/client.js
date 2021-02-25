/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /*
 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
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

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
        console.log(tweets);
        renderTweets(tweets);
      })
  }
 
  const renderTweets = function(tweets) {
    $('.tweet-container').empty();
    for (let i = 0; i < tweets.length; i++) {
      let $tweet = createTweetElement(tweets[i]);
      $('.tweet-container').prepend($tweet);
    }
  }

  $(".form-inline").on('submit', function (event) {
    console.log('Button clicked, performing ajax call...');
    event.preventDefault();
    if (!$("#tweet-text").val()) {
      // alert("Tweet cannot be blank");
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
      /*
      let newData = {
        "user": {
          "name": "Luke",
          "avatars": "/images/profile-hex.png",
          "handle": "@SPARTAN-501"
        },
        "content": {
          "text": $("#tweet-text").val()
        },
        "created_at": Date.now()
      }
      if (!newData.content.text) {
        alert("Tweet cannot be blank");
      } else if (newData.content.text.length > 140) {
        alert("Tweet is too long");
      } else {
        // let data = loadTweets();
        data.push(newData);
        renderTweets(data);
      }
      */
    });
    };
  });
 
 // Fake data taken from initial-tweets.json
 
  
  console.log(loadTweets());
  // renderTweets(data);
});
 
 /*
 const createTweetElement = function(tweet) {
   const $tweet = $(`<article class="tweet">Hello world</article>`);
   return $tweet;
 }

 const renderTweets = function(tweets) {
   for (let i = 0; i < tweets.length; i++) {
     let $tweet = createTweetElement(tweets[i]);
     $('#tweets-container').append($tweet);
   }
 }

 // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

renderTweets(data);
*/