import ScriptReader from "./ScriptReader";

import * as logger from "de-loggingsystem";

import { LogLevel } from "de-loggingsystem";
import * as path from "path";
import { MessageArray } from "./ScriptReader";

import * as dotenv from "dotenv";
import * as twilio from "twilio";

dotenv.config();

async function start() {
  // Twilio setup
  let accountSid = process.env.TWILIO_ACCOUNT_SID;
  let authToken = process.env.TWILIO_AUTH_TOKEN;
  var client = new twilio.Twilio(accountSid!, authToken!);
  // Script Reader setup
  let filePath: string = path.join(
    __dirname,
    "..",
    "assets",
    "shrek-script.md"
  );
  let sr: ScriptReader = new ScriptReader();
  let data: string = sr.Read(filePath);
  let messageArray = sr.SMSMessageSplit(data);
  let messageLength = Object.keys(messageArray).length;

  console.log(`Preparing to send ${messageLength} message parts.`);

  for (let i = 0; i < messageLength; i++) {
    console.log(`Sending message part ${i + 1} of ${messageLength}...`);
    try {
      const message = await client.messages.create({
        body: messageArray[i],
        to: process.env.TO_NUMBER!, // Ensure TO_NUMBER is set in your .env file
        from: process.env.FROM_NUMBER!, // Ensure FROM_NUMBER is set in your .env file
      });
      console.log(
        `Message part ${i + 1} sent successfully. SID: ${message.sid}`
      );

      // Add a delay only if it's not the last message part
      if (i < messageLength - 1) {
        // Delay to respect API rate limits (e.g., 1 message per second for long codes)
        // Adjust this value as needed based on your Twilio number type and limits.
        const delayMilliseconds = 1100; // 1.1 seconds
        console.log(
          `Waiting for ${
            delayMilliseconds / 1000
          } seconds before sending the next part...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
      }
    } catch (error) {
      console.error(`Failed to send message part ${i + 1}:`, error);
      // Optionally, you can decide to stop the process on error:
      // throw error;
      // Or add a longer delay and retry, or skip. For now, it logs and continues.
      console.log("Continuing with the next message part despite the error.");
    }
  }
  console.log("All message parts have been processed.");
}

export default start();
