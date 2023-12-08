$(document).ready(function() {

  const $tweetText = $('#tweet-text');

  // any time something is typed into text box, this function counts how many characters are currently typed, and subtracts it from 140 to show how many chars are left
  $tweetText.on('input', function() {
    let $counter = $(this).closest("form").find(".counter"); // goes up DOM to form, then down to .counter (and saves .counter to variable)
    const text = $(this).val(); // this variable contains all text typed into textbox
    const numOfChars = text.length; // find num of characters currently in text box
    $counter.text(140-numOfChars); // change counter to equal 140-numOfChars
  });

});