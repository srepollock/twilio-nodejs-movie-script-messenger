export interface MessageArray {
    [id: string]: string;
}
declare class ScriptReader {
    constructor();
    Read(filepath: string): string;
    SMSMessageSplit(data: string): MessageArray;
}
export default ScriptReader;
