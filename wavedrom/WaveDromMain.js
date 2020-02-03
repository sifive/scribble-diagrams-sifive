#!/usr/bin/env node
const fs = require('../util/fs-pre12');
const json5 = require('json5');
const {WaveDrom} = require('./WaveDrom');

/************************************************************
 * Main program to produce a wavedrom image.
 *   Reads a file of json, producing an svg file.
 *   input and output may be file names or integer fds.
 *   Note: must use node 12 or greator if fds are pipes.
 */
const WaveDromMain = async (input, output) => {

    // Read the input json and convert it to binary source data.
    const json = await fs.readFile(input);
    const source = json5.parse(json);

    // Invoke wavedrom, generating an svv.
    const svg = WaveDrom(source);

    // Write the SVG to the output.
    await fs.writeFile(output, svg);
};


// Invoke the wavedrom processor with input and output files.
//    If not given, use stdin and stdout.
WaveDromMain(process.argv[2] || process.stdin.fd, process.argv[3] || process.stdout.fd);
