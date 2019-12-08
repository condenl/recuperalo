import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs";
import { ChatService } from '../shared/chat.service';
import { AppUser } from '../shared/app-user';
import { ListView } from 'ui/list-view';
import { TextField } from 'ui/text-field';
import { RouteUtilsService } from '../route/route-utils.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Chat } from '../shared/chat';
import { LostObject } from '../shared/lost-object';
import { Image } from '../shared/image';
import { RouteFragment } from '../route/route-fragment.enum';

@Component({
  selector: 'ns-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  @ViewChild("list", { static: false })
  private lv: ElementRef;

  @ViewChild("textfield", { static: false })
  private tf: ElementRef;

  private list: ListView;

  private textfield: TextField;
  
  private messages$: Observable<any>;

  private chat: Chat;

  private lostObject: LostObject;

  private currentUser: AppUser;

  private receiver: AppUser;
  
  public constructor(private route: ActivatedRoute, 
    private routeUtils: RouteUtilsService, 
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.route
      .data
      .subscribe((data) => {
          this.currentUser = data.appUser;
          this.chat = data.chat as Chat;
          this.lostObject = this.normalizeLostObject(data.lostObject, data.noItemPhotoUrl);
          
          if (this.chat) {
            this.receiver = this.chat.receiver;
            this.messages$ = <any>this.chatService.getMessages(this.chat.id);
          } else {
            this.receiver = this.lostObject.createdByAppUser;
          }

          if (!this.receiver.profilePhotoUrl) {
            this.receiver.profilePhotoUrl = data.defaultProfilePhotoUrl;
          }
        }
      );
  }

  normalizeLostObject(lostObject: LostObject, noItemPhotoUrl: string): LostObject {
    if (!(lostObject.photos && lostObject.photos.length > 0)) {
      lostObject.photos = [{ url: noItemPhotoUrl } as Image];
    }
    return lostObject;
  }

  public ngAfterViewInit() {
    this.list = this.lv.nativeElement;
    this.textfield = this.tf.nativeElement;
  }

  scroll(count: number) {
    this.list.scrollToIndex(count - 1);
    this.list.refresh();
  }

  sendMessage(message: string) {
    let promise = Promise.resolve();
    if (!this.chat) {
        promise = this.chatService.chat(this.lostObject.id, [this.currentUser.id, this.receiver.id])
          .then(chat => {
            this.chat = chat;
            console.log("sendMessage", this.chat);
            this.messages$ = <any>this.chatService.getMessages(this.chat.id);
          });
    }
    promise
      .then(() => this.chatService.sendMessage(this.chat.id, this.lostObject, 
          this.currentUser.id, this.receiver, message))
      .then(data => {
        if (this.list.items) {
          this.scroll(this.list.items.length);
        }
      });
    this.textfield.text = '';
  }

  view(id: string) {
    this.routeUtils.routeTo("/lost-object-view/" + this.lostObject.id + (this.chat ? "/" + this.chat.id : ''),
      "slideBottom", RouteFragment[RouteFragment.FROM_CHAT]);
  }

}
