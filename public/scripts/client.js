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

  const renderTweets = function (tweets) {

    for (let tweet of tweets) {
      let newTweetHTML = createTweetElement(tweet);
      $('.tweet-collection').append(newTweetHTML);
    }

  };

  renderTweets(data);
});



////////// TWEET DATA OBJECTS: /////////

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
];
