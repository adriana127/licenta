import { Message } from "@stomp/stompjs";
import { Chat } from "./chat";
import { ChatMessage } from "./message";

export interface DisplayChat {
    chat:Chat,
    message:ChatMessage
  }