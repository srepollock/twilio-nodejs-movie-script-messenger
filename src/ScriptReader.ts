import fs from "fs";

export interface MessageArray {
    [id: string]: string;
}

class ScriptReader {
    constructor() {

    }
    public Read(filepath: string): string {
        let output = fs.readFileSync(filepath, "utf-8");
        return output;
    }
    public SMSMessageSplit(data: string): MessageArray {
        let output: MessageArray = {};
        let messageCount = 0;
        let messageLength = 0;
        let curData = "";
        let dataArray = data.split("\n");
        dataArray.forEach((element: string) => {
            let line = element.trim();
            if (line !== "") {
                if ((messageLength + line.length) < 480) {
                    curData += line + "\n";
                    messageLength += line.length + 1;
                } else {
                    output[messageCount++] = curData;
                    messageLength = 0;
                    curData = line;
                    messageLength += line.length;
                }
            } else {
                curData += "\n";
                messageLength += 1;   
            }
        });
        output[messageCount++] = curData;

        return output;
    }
}

export default ScriptReader;