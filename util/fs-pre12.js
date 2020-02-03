const fs = require('fs-extra');

/***************************************************************
 * WORKAROUND. in Node 10, fs.readFile returns EPIPE when reading from a pipe.
 *   The problem is fixed in Node 12.
 *   For now, read from a file descriptor using streams.
 *   Get rid of this routine once Node is updated to 12 or later.
 */
const readFile = async (name) => {

    // If a file name (ie. not an integer), then read file as usual.
    if (!Number.isInteger(name)) return fs.readFile(name);

    // Otherwise, it's a file descriptor. Read it as a stream.
    const stream = fs.createReadStream(null, { fd: name });
    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer.toString('utf8');
};


/***************************************************************
 * WORKAROUND. Before node 10, fs.writeFile returns EPIPE when reading from a pipe.
 *   The problem is fixed in Node 12.
 *   For now, write to a file descriptor using streams.
 *   Get rid of this routine once Node is updated to 12 or later.
 */
const writeFile = async (name, data) => {

    // If a file name (ie. not an integer), then read file as usual.
    if (!Number.isInteger(name)) return fs.writeFile(name, data);

    // Otherwise, it's a file descriptor. Read it as a stream.
    const stream = fs.createWriteStream(null, { fd: name });
    await stream.write(data);
};

module.exports = {readFile, writeFile};
