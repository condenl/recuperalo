import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject, from } from 'rxjs';
import { share, mergeMap } from 'rxjs/operators';
import { Chat } from "./chat";
import { Message } from "./message";
import { LostObjectService } from "./lost-object.service";
import { AppUserService } from "./app-user.service";
const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class ChatService {

  constructor(private lostObjectService: LostObjectService, 
    private appUserService: AppUserService,
    private ngZone: NgZone){ }

  private chats: BehaviorSubject<Array<Chat>> = new BehaviorSubject([]);
  
  private _chats: Array<Chat> = [];

  private messages: BehaviorSubject<Array<Message>> = new BehaviorSubject([]);
  
  private _messages: Array<Message> = [];

  getMessage(){ 
    firebase.addOnMessageReceivedCallback(function (data) {
        alert(JSON.stringify(data));
    });
  }
  
  getChats(fromId: string): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'chats';
      
      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          observer.next(this.handleChatSnapshot(fromId, snapshot.value));
        });
      };
      firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).pipe(mergeMap(c => from(this.populateChat(fromId, c as Chat))), share());
  }

  populateChat(fromId: string, chat: Chat): Promise<Chat> {
    let userId: string = this.getFirstFromArray(fromId, chat.users);
    return Promise.all([this.lostObjectService.findByFirebaseKey(chat.itemId),
      this.appUserService.getProfileImage(userId)])
        .then(arr => {
          chat.lostObject = arr[0];
          chat.imageUrl = arr[1];
          return chat;
        }) as Promise<Chat>;
  }

  getFirstFromArray(exclude: string, arr: Array<string>): string {
    let result: string = exclude;
    for (let i = 0; i < arr.length; i++) {
      if (exclude != arr[i]) {
        result = arr[i];
        break;
      }
    }
    return result;
  }

  handleChatSnapshot(fromId: any, data: any): Array<Chat> {
    //empty array, then refill and filter
    let chat: Chat;
    this._chats = [];
    if (data) {
      for (let id in data) {        
        chat = (<any>Object).assign({id: id}, data[id]) as Chat;
        if (chat.users != null && chat.users.indexOf(fromId) > -1) {
          this._chats.push(chat);
        }
      }
      this.publishChatUpdates();
    }
    return this._chats;
  }

  publishChatUpdates() {
    this._chats.sort(function(a, b){
      if(a.date < b.date) return -1;
      if(a.date > b.date) return 1;
      return 0;
    })
    this.chats.next([...this._chats]);
  }

  getMessages(itemId: any, fromId: any): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'messages';
      
      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          observer.next(this.handleMessageSnapshot(itemId, fromId, snapshot.value));
        });
      };
      firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).pipe(share());
  }

  handleMessageSnapshot(itemId: any, fromId: any, data: any) {
    //empty array, then refill and filter
    let message: Message;
    this._messages = [];
    if (data) {
      for (let id in data) {
        message = (<any>Object).assign({id: id}, data[id]) as Message;
        if (message.itemId == itemId && (message.from == fromId || message.to == fromId)) {
          this._messages.push(message);
        }
      }
      this.publishMessageUpdates();
    }
    return this._messages;
  }

  publishMessageUpdates() {
    this._messages.sort(function(a, b){
      if(a.date > b.date) return -1;
      if(a.date < b.date) return 1;
      return 0;
    })
    this.messages.next([...this._messages]);
  }

  chat(itemId: any, users: Array<any>) {
    return firebase.push(
        "/chats",
        { "itemId": itemId, "users": users, "date": 0 - Date.now()}
      ).then(
        function (result: any) {
          return 'chat sent';
        },
        function (errorMessage: any) {
          console.log(errorMessage);
        }
      ); 
  }

  sendMessage(itemId: any, fromId: any, toId: any, message: string) {
    console.log(message);
    return firebase.push(
        "/messages",
        { "message": message, "itemId": itemId, "from": fromId, "to": toId, "date": 0 - Date.now()}
      ).then(
        function (result: any) {
          return "chatted";
        },
        function (errorMessage: any) {
          console.log(errorMessage);
        }
      ); 
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}