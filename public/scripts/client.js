/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // function that creates a new tweet container filled with the data from the object passed in
  const createTweetElement = function (obj) {

    const name = obj.user.name;
    const avatar = obj.user.avatars;
    const handle = obj.user.handle;
    const content = obj.content.text;
    const timeCreated = obj.created_at;

    // all html for new tweet container, using data pulled from object
    const newTweetContainer = $(
      `<article class="tweet-container">
          <header>
            <div class="left-header">
              <img src=${avatar} class ="avatar" alt="face icon">
              <p class="user-name">${name}</p>
            </div>
            <p class="handle">${handle}</p>
          </header>
          <p class="posted-tweet">${content}</p>
          <footer>
            <p class="time-posted">${timeCreated}</p>
            <div class="posted-tweet-icons">
              <i class="fa-solid fa-flag" alt="flag"></i>
              <i class="fa-solid fa-repeat" alt="retweet"></i>
              <i class="fa-solid fa-heart" alt="heart"></i>
            </div>
          </footer>
        </article>`
      );
    
    return newTweetContainer;

  };

  // renders tweets from passed in object
  const renderTweets = function (tweets) {

    for (let tweet of tweets) {
      let newTweetHTML = createTweetElement(tweet);
      $('.tweet-collection').append(newTweetHTML);
    }

  };

  const $tweetForm = $('#tweet-form');

  // event listener for tweet-form submit
  $tweetForm.on('submit', function (event) {
    event.preventDefault();
    const $textarea = $(this).find('#tweet-text');
    const serializedText = $textarea.serialize();
    const text = $textarea.val();

    if (text === "" || text === null) {
      alert("You need to include something to actually tweet!");
      return;
    }

    if (text.length > 140) {
      alert("You need to make this a bit shorter :)");
      return;
    }

    $.post("/tweets", serializedText, function () {
    });
  });

  // loads all tweets in database to page
  const loadTweets = function () {
    $.get("/tweets", function(data) {

      // convert timestamp to timeago for each tweet
      for (let tweet of data) {
        const time = tweet.created_at;
        const formattedTime = timeago.format(time);
        tweet.created_at = formattedTime;
      }

      renderTweets(data);

    });
  };

  loadTweets();

});