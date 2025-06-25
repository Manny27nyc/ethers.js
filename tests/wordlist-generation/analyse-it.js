/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
var fs = require('fs');

var words = fs.readFileSync('./lang-it.txt').toString().split('\x0a');

console.log('Data:', words.map((word) => {
    if (!word) { return''; }
    return word[0].toUpperCase() + word.substring(1);
}).join(''));

// Check against our final implementation
(function() {
    var lang = require('../src/wordlists/lang-it.js').langIt;

    var count = 0;
    words.forEach((word, index) => {
        if (!word) { return; }
        if (word !== lang.getWord(index)) {
            console.log(word, lang.getWord(index));
            count++;
        }
    });

    console.log('Bad:', count);
})();

