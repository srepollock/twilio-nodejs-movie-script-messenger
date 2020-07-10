import dotenv from "dotenv";
import * as twilio from "twilio";

dotenv.config();

let start = () => {
    let accountSid = process.env.TWILIO_ACCOUNT_SID;
    let authToken = process.env.TWILIO_AUTH_TOKEN;
    var client = new twilio.Twilio(accountSid!, authToken!);
    client.messages.create({
        body: "Hello from node",
        to: "+17788687438",
        from: "+12058469742",
    })
    .then((message: any) => console.log(message.sid));

}; 
start();
