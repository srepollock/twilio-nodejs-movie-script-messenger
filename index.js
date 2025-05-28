#!/usr/bin/env node
// The imported module executes its start function and returns a Promise.
let operationsPromise = require("./lib/index.umd.js");

async function sequence() {
  console.log("Starting Twilio operations...");
  // Await the promise directly, as it's not a function to be called here.
  await operationsPromise;
  console.log("Twilio operations completed.");
  return "done!";
}

async function main() {
  console.log("start"); // Logs when the script begins
  await sequence(); // Wait for the sequence (and thus Twilio operations) to complete
  console.log("stop"); // Logs after all operations in sequence are done
}

// Execute the main function and catch any potential errors
main().catch((error) => console.error("Script execution failed:", error));
