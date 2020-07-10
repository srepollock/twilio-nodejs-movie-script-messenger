import fs from "fs";
import path from "path";
import ScriptReader from "../src/ScriptReader";

describe("ScriptReader Unit Test", () => {
    it("should read the file into a string", () => {
        let localPath: string = path.join(__dirname, "..", "assets", "testa-script.md");
        let readData = fs.readFileSync(localPath, "utf-8");
        let sr = new ScriptReader();
        let srData = sr.Read(localPath);
        expect(srData).toEqual(readData);
    });
    it("should parse the test file into a scriptable string", () => {
        let localPath: string = path.join(__dirname, "..", "assets", "testa-script.md");
        let sr = new ScriptReader();
        let srData = sr.Read(localPath);
        let srArray = sr.SMSMessageSplit(srData);
        console.log(srArray);
    });
    it("should parse the shrek file into a scriptable string", () => {
        let localPath: string = path.join(__dirname, "..", "assets", "shrek-script.md");
        let sr = new ScriptReader();
        let srData = sr.Read(localPath);
        let srArray = sr.SMSMessageSplit(srData);
        console.log(srArray);
    });
});