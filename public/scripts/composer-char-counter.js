$(document).ready(function() {

  const $tweetText = $('#tweet-text');

  // any time something is typed into text box, this function counts how many characters are currently typed, and subtracts it from 140 to show how many chars are left
  $tweetText.on('input', function() {
    let $counter = $(this).closest("form").find(".counter"); // goes up DOM to form, then down to .counter (and saves .counter to variable)
    const text = $(this).val(); // this variable contains all text typed into textbox
    const numOfChars = text.length; // find num of characters currently in text box
    const remainingChars = 140 - numOfChars;

    $counter.text(remainingChars); // change counter to equal 140-numOfChars

    if (remainingChars < 0) { // adds .negative that changes counter to red in CSS file
      $counter.addClass("negative");
    } else { // removes .negative class if counter is positive
      $counter.removeClass("negative");
    }

  });

  // reset counter when submitted
  $('#tweet-form').on('submit', function() {
    const text = $tweetText.val();
    let $counter = $(this).find(".counter");

    if (text.length > 0 && text.length <= 140) {
      $counter.text(140);

      // clear textbox on submit
      $tweetText.val("");
    }
    
  });

});