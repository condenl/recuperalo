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
  
  private currentUser: AppUser;

  private itemId: String;
  
  private messages$: Observable<any>;

  private chat: Chat;

  private lostObject: LostObject;
  
  public constructor(private route: ActivatedRoute, 
    private routeUtils: RouteUtilsService, 
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['itemId'];
    this.route
      .data
      .subscribe((data) => {
          this.currentUser = data.appUser[Object.keys(data.appUser)[0]] as AppUser;
          this.chat = data.chat[Object.keys(data.chat)[0]] as Chat;
          this.lostObject = data.lostObject[Object.keys(data.lostObject)[0]] as LostObject;
          this.messages$ = <any>this.chatService.getMessages(this.itemId, this.currentUser.userId);
        }
      );
  }

  public ngAfterViewInit() {
      this.list = this.lv.nativeElement;
      this.textfield = this.tf.nativeElement;
  }

  scroll(count: number){
      console.log("scrolling to ", count);
      this.list.scrollToIndex(count-1);
      this.list.refresh();
  }

  sendMessage(toId: string, message: string) {
    let promise = Promise.resolve();
    if (!this.chat) {
        promise = this.chatService.chat(this.itemId, [this.currentUser.userId, this.lostObject.createdBy]);
    }
    promise.then(this.chatService.sendMessage(this.itemId, this.currentUser.userId, this.lostObject.createdBy, message)).then((data: any) => {
      this.scroll(this.list.items.length);
    });
    this.textfield.text = '';
  }

}
