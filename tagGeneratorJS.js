// Module to structure and hide function / variables
var tagGeneratorModule = (function(){
  // Array to store words generated from wordGenerator
  var words = [];

  // PRIVATE METHODS PRIVATE METHODS PRIVATE METHODS
  var sortWords = function(words, rowLength) {

    // Setting variable that will count total amount of characters (excluding space and linebreaks)
    let characters = 0;
    // Variable to calculate max allowed row length
    var CharLoop = true;
    // Getting HTML element
    const wordElement = document.getElementById('wordTags');
    // Removing wordElement to update after deleting a word
    wordElement.innerHTML = '';
    // Creating a document fragment
    const fragment = document.createDocumentFragment();

    // Making sure rows are not longer then rowLength (100 characters)
    for(let i = 0; i < words.length; i++) {
      // Counter to keep track on words per row
      characters = words[i].length + characters;
      // Creating div only if Charloop is true
      if(CharLoop == true) {
        var div = document.createElement('div');
        CharLoop = false;
      }
      // Creating span element
      const span = document.createElement('span');
      // Applying text to the span element
      span.textContent = words[i];
      // Applying a delete function to the span elements
      span.onclick = function() {
        deleteWords(this.textContent, rowLength);
      }
      // Appending the span elements to the div
      div.appendChild(span);

      // If character length reached max. Set Charloop true to create a new div
      if(characters >= rowLength) {
        CharLoop = true;
        characters = words[i].length;
      }
      // Adding the div elements to fragment
      fragment.appendChild(div);
    }
    // Adding the fragment to the document after loop
    wordElement.appendChild(fragment);
  }

  var deleteWords = function(word, rowLength) {
    for(let i = 0; i < words.length; i++) {
      if(word == words[i]) {
        words.splice(i, 1);
      }
    }
    sortWords(words, rowLength);
  }
  
  // Function cleaning div contentand array
  var removeFunc = function() {
    words = [];
    const wordElement = document.getElementById('wordTags');
    wordElement.innerHTML = '';
  }

  // PUBLIC METHODS PUBLIC METHODS PUBLIC METHODS
  var wordGenerator = function(amount, rowLength) {
    // Possible characters
    var possible = 'abcdefghijklmnopqrstuvwxyzåäö';
    // Loop for amount of words beeing generated
    for(let i = 0; i < amount; i++) {
      // Empty string for temporarly storing words
      let word = '';
      // Variable randomly setting lenght of words with a max length of 12 min of 1
      var wordMaxLength = Math.floor(Math.random() * 12) + 1;
      // Loop making sure each words characters are random
      for(let w = 0; w < wordMaxLength; w++) {
        word += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      // Adding newly created words to the words Array
      words.push(word);
    }
    // Running sortWords function
    sortWords(words, rowLength);
  }

  // Returning Public Methods
  return {
    wordGenerator: wordGenerator,
    removeFunc: removeFunc
  }
}());

// EXECUTING FUNCTIONS
// Function cleaning div and array content
var removeFunc = function(){
    tagGeneratorModule.removeFunc();
}

// Function binding input values to the wordGenerator function
var bindFunc = function(){
  let words = document.getElementById('words').value;
  let rowLength = document.getElementById('rowLength').value;
  tagGeneratorModule.wordGenerator(words, rowLength);
}
