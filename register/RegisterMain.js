#!/usr/bin/env node
const fs = require('../util/fs-pre12.js');
const json5 = require('json5');
const {Register} = require('./Register.js');


/************************************************************
 * Main program to produce a Register fields image.
 *   Reads a file of json in "wavedrom" format and produces an svg file.
 *   input and output may be file names or integer fds.
 */
const RegisterMain = async (input, output) => {

    // Read the input json and convert it to binary source data.
    const json = await fs.readFile(input);
    const data = json5.parse(json);

    // Generate the register svg diagram.
    const svg = Register(data);

    // Write the SVG to the output.
    await fs.writeFile(output, svg);
};


// Invoke the wavedrom processor with input and output files.
//    If not given, use stdin and stdout.
RegisterMain(process.argv[2] || process.stdin.fd, process.argv[3] || process.stdout.fd)



