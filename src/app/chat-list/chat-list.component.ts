import { Component, OnInit, NgZone } from '@angular/core';
import { AppUser } from '../shared/app-user';
import { ActivatedRoute } from '@angular/router';
import { RouteUtilsService } from '../route/route-utils.service';
import { HomeActivityIndicatorService } from '../shared/home-activity-indicator.service';
import { Observable, NextObserver } from "rxjs";
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

  private hasContent: boolean;

  private loading: boolean = true;

  constructor(private route: ActivatedRoute, 
    private homeActivityIndicatorService: HomeActivityIndicatorService,
    private routeUtils: RouteUtilsService,
    private chatService: ChatService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.route
        .data
        .subscribe((data: { appUser: AppUser; defaultProfilePhotoUrl: string }) => {
            this.appUser = data.appUser;
            this.chats$ = this.chatService.getChats(this.appUser.id, data.defaultProfilePhotoUrl);
            this.chatService.getChats(this.appUser.id, data.defaultProfilePhotoUrl).subscribe({
              next: n => this.ngZone.run(() => this.loading = false)
            } as NextObserver<any>);
        });
    this.hasContent = false;
    this.homeActivityIndicatorService.notBusy();
  }

  chatDescription(chat: Chat): string {
    this.setHasContent();
    let description: string = chat.lostObject.description ? chat.lostObject.description : "";
    return description.length > 10 ? description.substring(0, 10) + "..." : description;
  }

  setHasContent(): void {
    this.ngZone.run(() => {
      this.hasContent = true;
    });
  }

  openChat(lostObjectId: string, chatId: string): void {
    this.routeUtils.routeTo("/chat/" + lostObjectId + "/" + chatId);
  }

}
