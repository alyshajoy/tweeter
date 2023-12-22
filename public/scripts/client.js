/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // function that creates a new tweet container filled with the data from the object passed in
  const createTweetElement = function(obj) {

    const name = obj.user.name;
    const avatar = obj.user.avatars;
    const handle = obj.user.handle;
    const content = obj.content.text;
    const timeCreated = obj.created_at;

    // escape function that neutralizes any HTML in the text
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // all html for new tweet container, using data pulled from object
    const newTweetContainer = $(
      `<article class="tweet-container">
        <header>
          <div class="left-header">
            <img src=${avatar} class ="avatar" alt="face icon">
            <p class="user-name">${name}</p>
          </div>
          <p class="handle">${escape(handle)}</p>
        </header>
        <p class="posted-tweet">${escape(content)}</p>
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
  const renderTweets = function(tweets) {

    const $tweetCollection = $('.tweet-collection');
    $tweetCollection.empty();

    for (let tweet of tweets) {
      let newTweetHTML = createTweetElement(tweet);
      $('.tweet-collection').append(newTweetHTML);
      console.log(`${tweet.user.name} rendered`);
    }

  };

  const $tweetForm = $('#tweet-form');

  // event listener for tweet-form submit
  $tweetForm.on('submit', function(event) {
    event.preventDefault();
    const $textarea = $(this).find('#tweet-text');
    const serializedText = $textarea.serialize();
    const text = $textarea.val();
    const $errorMessageEmpty = $('.error-message-empty');
    const $errorMessageLong = $('.error-message-long');

    if (text === "" || text === null) { // error message if nothing is typed when they try to submit
      $errorMessageEmpty.addClass('error');
      return;
    }

    if (text.length > 140) { // error message if tweet is too long
      $errorMessageLong.addClass('error');
      return;
    }

    $.post("/tweets", serializedText)
      .done(function(response, status) {
        if (status === 'success') {
          loadTweets();
        }
      });

    $textarea.val("");
  });

  // remove error messages once error is resolved by user
  $('#tweet-text').on('input', function() {
    const text = $(this).val();
    const $errorMessageEmpty = $('.error-message-empty');
    const $errorMessageLong = $('.error-message-long');
  
    if (text !== "" && text.length <= 140) {
      $errorMessageEmpty.removeClass('error');
      $errorMessageLong.removeClass('error');
    }

  });

  // loads all tweets in database to page
  const loadTweets = function() {
    $.get("/tweets", function(data) {

      const tweetArray = [];
      // convert timestamp to timeago for each tweet
      for (let tweet of data) {
        const time = tweet.created_at;
        const formattedTime = timeago.format(time);
        tweet.created_at = formattedTime;
        tweetArray.unshift(tweet);
      }

      renderTweets(tweetArray);

    });
  };

  loadTweets();

});