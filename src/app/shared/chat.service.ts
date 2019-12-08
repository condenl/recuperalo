import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject, from } from 'rxjs';
import { share, mergeMap } from 'rxjs/operators';
import { Chat } from "./chat";
import { Message } from "./message";
import { LostObjectService } from "./lost-object.service";
import { AppUserService } from "./app-user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppUser } from "./app-user";
import { LostObject } from "./lost-object";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class ChatService {

  constructor(private lostObjectService: LostObjectService, 
    private appUserService: AppUserService,
    private ngZone: NgZone,
    private http: HttpClient){ }

  private chats: BehaviorSubject<Array<Chat>> = new BehaviorSubject([]);
  
  private _chats: Array<Chat> = [];

  private messages: BehaviorSubject<Array<Message>> = new BehaviorSubject([]);
  
  private _messages: Array<Message> = [];
  
  public findById(id: string): Promise<any> {
    return firebase.getValue("/chats/" + id)
        .then(result => (<any>Object).assign({id: result.key}, result.value) as Chat);
  }

  findByItemId(itemId: string, nonObjectOwnerId: string): Promise<Chat> {
    return firebase.query(function(result) {
        if (result.error)
         console.log("Error retrieving chat: " + result.key);
        },
        "/chats",
        {
          singleEvent: true,
          orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: 'itemId'
          },
          range: {
            type: firebase.QueryRangeType.EQUAL_TO,
            value: itemId
          }
        }
    ).then(
        result => {
          this.filterByUser(result.value, nonObjectOwnerId);
        }
    );
  }
  
  filterByUser(chats: any, userId: string): Chat {
    let chat: Chat = null;
    let chatKeys: Array<string> = Object.keys(chats);
    for (let i = 0; i < chatKeys.length; i++) {
      if (chats[chatKeys[i]].users && chats[chatKeys[i]].users.indexOf(userId) > -1) {
        chat = (<any>Object).assign({id: chatKeys[i]}, chats[chatKeys[i]]) as Chat;
      }
    }
    return chat;
  }

  getChats(fromId: string, defaultProfilePhotoUrl: string): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'chats';
      
      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          observer.next(this.handleChatSnapshot(fromId, snapshot.value));
        });
      };
      firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).pipe(mergeMap(c => from(this.populateChat(fromId, c as Array<Chat>, defaultProfilePhotoUrl))), share());
  }

  populateChat(fromId: string, chats: Array<Chat>, defaultProfilePhotoUrl: string): Promise<Array<Chat>> {
    let chatsPromise;
    if (chats && chats.length > 0) {
      let promises: Array<Promise<Chat>> = [];
      for (let i = 0; i < chats.length; i++) {
        let chat = chats[i];
        let userId: string = this.extractReceiverId(fromId, chat.users);
        promises.push(Promise.all([this.lostObjectService.findById(chat.itemId),
          this.appUserService.findById(userId)])
            .then(arr => {
              chat.lostObject = arr[0];
              chat.imageUrl = arr[1].profilePhotoUrl ? arr[1].profilePhotoUrl : defaultProfilePhotoUrl;
              return chat;
            }));
      }
      chatsPromise = Promise.all(promises).then(arr => arr);
    } else {
      chatsPromise = Promise.resolve();
    }
    return chatsPromise as Promise<Array<Chat>>;
  }

  // helper method
  extractReceiverId(exclude: string, arr: Array<string>): string {
    let result: string;
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

  getMessages(chatId: any): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'messages';
      
      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          observer.next(this.handleMessageSnapshot(chatId, snapshot.value));
        });
      };
      firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).pipe(share());
  }

  handleMessageSnapshot(chatId: any, data: any) {
    //empty array, then refill and filter
    let message: Message;
    this._messages = [];
    if (data) {
      for (let id in data) {
        message = (<any>Object).assign({id: id}, data[id]) as Message;
        if (message.chatId == chatId) {
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
    let chat = { itemId: itemId, users: users, date: 0 - Date.now() };
    return firebase.push("/chats", chat)
      .then(result => (<any>Object).assign({id: result.key}, chat));
  }

  sendMessage(chatId: string, lostObject: LostObject, fromId: any, receiver: AppUser, message: string) {
    return firebase.push(
        "/messages",
        { "message": message, "itemId": lostObject.id, "from": fromId, "to": receiver.id, "date": 0 - Date.now()}
      ).then(() => {
        if (receiver.pushToken) {
          let title = receiver.username + " " + lostObject.name;
          this.pushNotification(message, title, receiver.pushToken, chatId, lostObject.id);
        }
      });
  }

  // TODO deploy this in a google cloud function or similar
  pushNotification(message: string, title: string, pushToken: string, chatId: string, itemId: string) {
    this.http.post("https://fcm.googleapis.com/fcm/send", 
      {
        notification: {
          title: title, 
          text: message, 
          badge: "1", 
          sound: "default"
        }, 
        data: {
          itemId: itemId,
          chatId: chatId
        }, 
        priority: "High", 
        to: pushToken
      }, { headers: this.getFcmHeaders() });
  }

  getFcmHeaders(): HttpHeaders  {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "key=AAAAO2P0aN4:APA91bGWdFIsuoNLT6xo8-AFYkfOWNXa_F-9_Qm18iq1uEHXTffYOB01Dn9EfWZAG1NIjeCq2YvWfN3qZEXlsWxAt0W1XLV0MqJYpPXqBoeZyHvNHahiedyiWJYDqban9kec11kgV9sN"
    });
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}