
const { renderAny , onml } = require('wavedrom');

// WaveDrom skins used by the wavedrom command line tool.
const { 'default': def } = require('wavedrom/skins/default');
const { lowkey } = require('wavedrom/skins/lowkey');
const { narrow } = require('wavedrom/skins/narrow');


/**************************************************************
 * Invoke the regular WaveDrom.
 */
const WaveDrom = (data) => {

    // Combine the skins together.
    const skins = { 'default': def, lowkey, narrow };

    // Process the data and convert result to SVG
    const result = renderAny(0, data, skins);
    const svg = onml.stringify(result);

    return svg;
};

module.exports = {WaveDrom};
