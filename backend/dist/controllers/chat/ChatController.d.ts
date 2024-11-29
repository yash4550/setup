export declare class ChatController {
    static sendMessage(data: any, callback: any, socket: any, io: any): Promise<void>;
    static chatHistory(data: any, callback: any): Promise<void>;
    static readMessage(data: any, callback: any): Promise<void>;
    static chatList(data: any, callback: any, socket: any): Promise<void>;
}
