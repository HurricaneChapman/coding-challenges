const inputText = "If you want to jumpstart the process of talking to us about this role, here’s a little challenge: write a program that outputs the largest unique set of characters that can be removed from this paragraph without letting its length drop below 50.";

/*
  My interpretation of the problem:

  You're looking for a function that removes all instances of a character, so if I remove 'a', all instances of 'a' are removed at once. I need to find the most maximum number of characters that can be removed in this fashion without the remainder of the string falling below a certain number, in this case 50, and return an array of those characters.

  I believe this function should perform this tasks efficiently and flexibly. It should work for all kinds of natural language strings and minimum lengths. The testing function I wrote works for your test case, though because it uses regex it'd need a bit more work to make it universal.
 */

function yankChars(p, minLen) {
    // create a dictionary of each character in the string and how many times each character appears.
    const dict = {};
    let currentLength = p.length;
    const charsRemoved = [];

    for (let i = 0; i < p.length; i++) {
        const char = p[i] === ' ' ? 'SPACE' : p[i];
        dict[char] = dict[char] ? dict[char] + 1 : 1;
    }
    // Now we're going to iterate over them in a specific order, from least occurrences to most. We're going to sort the array backwards so we can just use array.pop for each iteration for speed
    const arr = Object.entries(dict).sort((a, b) => b[1] - a[1]);
    while (currentLength > minLen) {
        const [char, count] = arr.pop();
        currentLength -= count;
        if (currentLength >= minLen) {
            charsRemoved.push(char === 'SPACE' ? ' ' : char);
        }
    }
    return charsRemoved; // an array of removed characters
}

// Below: A quick and dirty test

function testYankChars(p, minLen) {
    //I want to see what the results of this really are, and if they're correct.
    const results = yankChars(p, minLen);
    const spaceIndex = results.indexOf(' ');
    if (spaceIndex !== -1) {
        results[spaceIndex] = '\s';
    }
    const regex = RegExp(`[${results.join('')}]`, 'g');
    const moddedString = p.replace(regex, '');
    return {
        result: moddedString.length >= minLen ? 'passed' : 'failed',
        length: moddedString.length,
        string: moddedString
    }
}

/*
   Demonstration code - not part of the solution but it runs in my index.html demo file - use chrome! It understands ES6 natively!
*/

document.addEventListener('readystatechange', () => {
    const resultArray = yankChars(inputText, 50);
    const {
        result,
        length,
        string
    } = testYankChars(inputText, 50);
    document.querySelector('#inputText').innerHTML = inputText;
    document.querySelector('#output').innerHTML = `['${resultArray.join('\', \'')}']`;
    document.querySelector('#result').innerHTML = result;
    document.querySelector('#testString').innerHTML = string;
    document.querySelector('#count').innerHTML = length;
});
