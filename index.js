#!/usr/bin/env node
let start = require('./lib/index.umd.js');
console.log('start');
async function sequence() {
    await start();  
    return "done!";
}
sequence();
console.log('stop');