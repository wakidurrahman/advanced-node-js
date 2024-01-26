"use strict";

/**
 * To reverse the sentence.
 * @param {*} sentence : expect regular sentence.
 * @returns: output revert sentence.
 */

function reverseSentence(sentence) {
  // to split the sentence into an array of single-word strings
  const wordsArray = sentence.split(" ");

  // to reverse the array
  const reversedArray = wordsArray.reverse();

  // to join the elements of the array back together to reform the sentence as a string.
  const reversedSentence = reversedArray.join(" ");

  return reversedSentence;
}

/**
 * `module.exports` is an object that is accessible in all Node.js JavaScript by default.
 * Whatever is assigned to the `module.exports` object is exposed.
 */

module.exports = reverseSentence;
