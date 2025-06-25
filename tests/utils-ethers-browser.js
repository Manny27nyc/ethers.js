/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
var assert = require('assert');

function getEthers(filename) {
    var ethers = global.ethers
    if (!ethers) { return undefined; }
    console.log('Using global ethers; ' + filename);
    assert.equal(ethers.platform, 'browser', 'platform: ' + ethers.platform + ' != "browser"');
    return ethers;
}

module.exports = getEthers;
