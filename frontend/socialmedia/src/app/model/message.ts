import { Chat } from "./chat";
import { Profile } from "./profile";

export interface ChatMessage {
    id:number,
    message:String,
    sender:Profile,
    chat:Chat,
    createdOn:Date,
    state:boolean
  }