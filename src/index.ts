import ScriptReader from "./ScriptReader";

import * as logger from "de-loggingsystem";

import { LogLevel } from "de-loggingsystem";
import path from "path";
import { MessageArray } from "./ScriptReader";

import dotenv from "dotenv";
import * as twilio from "twilio";

dotenv.config();

async function start() {
    // Twilio setup
    let accountSid = process.env.TWILIO_ACCOUNT_SID;
    let authToken = process.env.TWILIO_AUTH_TOKEN;
    var client = new twilio.Twilio(accountSid!, authToken!);
    // Script Reader setup
    let filePath: string = path.join(__dirname, "..", "assets", "shrek-script.md");
    let sr: ScriptReader = new ScriptReader();
    let data: string = sr.Read(filePath);
    let messageArray: MessageArray = sr.SMSMessageSplit(data);
    let messageLength = Object.keys(messageArray).length;
    let promises = [];
    for (let i = 0; i < messageLength; i++) {
        // logger.log(LogLevel.info, "Sending message: \n\n" + messageArray[i]);
        promises.push(client.messages.create({
            body: messageArray[i],
            to: process.env.TO_NUMBER,
            from: process.env.FROM_NUMBER,
        }).then((message: any) => console.log(message.sid)));
        let promise = new Promise((res, rej) => {
            setTimeout(() => res("Now it's done!"), 10000);
        });
    }
    return Promise.all(promises);
}
export default start();
