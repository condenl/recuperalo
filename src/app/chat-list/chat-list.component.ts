import { Component, OnInit } from '@angular/core';
import { AppUser } from '../shared/app-user';
import { ActivatedRoute } from '@angular/router';
import { RouteUtilsService } from '../route/route-utils.service';
import { HomeActivityIndicatorService } from '../shared/home-activity-indicator.service';
import { Observable } from "rxjs";
import { ChatService } from '../shared/chat.service';
import { Chat } from '../shared/chat';

@Component({
  selector: 'ns-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  private appUser: AppUser;

  private chats$: Observable<any>;

  constructor(private route: ActivatedRoute, 
    private homeActivityIndicatorService: HomeActivityIndicatorService,
    private routeUtils: RouteUtilsService,
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.route
        .data
        .subscribe((data: { appUser: AppUser }) => {
            this.appUser = data.appUser[Object.keys(data.appUser)[0]];
            this.chats$ = <any>this.chatService.getChats(this.appUser.userId);
        });
    
    this.homeActivityIndicatorService.notBusy();
  }

  chatDescription(chat: Chat): string {
    let description: string = chat.lostObject.description ? chat.lostObject.description : "";
    description = description.length > 10 ? description.substring(0, 10) + "..." : description;
    return chat.lostObject.name + " " + description;
  }

}
