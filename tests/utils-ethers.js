/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
var assert = require('assert');

function getEthers(filename) {
    let ethers = require('../index');
    console.log('Loaded local ethers: ' + filename);
    assert.equal(ethers.platform, 'node', 'platform: ' + ethers.platform + ' != "node"');
    return ethers;
}

module.exports = getEthers;
