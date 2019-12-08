import { LostObject } from "./lost-object";
import { AppUser } from "./app-user";

export class Chat {
    
    id: string;
    itemId: string;
    users: Array<any>;
    date: string;

    // these two properties are used for chat-tab view purposes, it may be clearer to create another dto
    lostObject: LostObject;
    imageUrl: string;

    // transient, chat component purposes
    receiver: AppUser;

}