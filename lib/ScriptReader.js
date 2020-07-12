import fs from "fs";
class ScriptReader {
    constructor() {
    }
    Read(filepath) {
        let output = fs.readFileSync(filepath, "utf-8");
        return output;
    }
    SMSMessageSplit(data) {
        let output = {};
        let messageCount = 0;
        let messageLength = 0;
        let curData = "";
        let dataArray = data.split("\n");
        dataArray.forEach((element) => {
            let line = element.trim();
            if (line !== "") {
                if ((messageLength + line.length) < 480) {
                    curData += line + "\n";
                    messageLength += line.length + 1;
                }
                else {
                    output[messageCount++] = curData;
                    messageLength = 0;
                    curData = line;
                    messageLength += line.length;
                }
            }
            else {
                curData += "\n";
                messageLength += 1;
            }
        });
        output[messageCount++] = curData;
        return output;
    }
}
export default ScriptReader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyaXB0UmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NjcmlwdFJlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFNcEIsTUFBTSxZQUFZO0lBQ2Q7SUFFQSxDQUFDO0lBQ00sSUFBSSxDQUFDLFFBQWdCO1FBQ3hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTSxlQUFlLENBQUMsSUFBWTtRQUMvQixJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzlCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQWUsRUFBRSxFQUFFO1lBQ2xDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxQixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFO29CQUNyQyxPQUFPLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDdkIsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUNwQztxQkFBTTtvQkFDSCxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7b0JBQ2pDLGFBQWEsR0FBRyxDQUFDLENBQUM7b0JBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ2hDO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLElBQUksQ0FBQztnQkFDaEIsYUFBYSxJQUFJLENBQUMsQ0FBQzthQUN0QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRWpDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQUVELGVBQWUsWUFBWSxDQUFDIn0=