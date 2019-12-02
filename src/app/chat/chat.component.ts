import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs";
import { ChatService } from '../shared/chat.service';
import { AppUser } from '../shared/app-user';
import { ListView } from 'ui/list-view';
import { TextField } from 'ui/text-field';
import { RouteUtilsService } from '../route/route-utils.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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
  
  private appUser: AppUser;

  private me: String;

  private itemId: String;
  
  private messages$: Observable<any>;
  
  public constructor(private route: ActivatedRoute, 
    private routeSnapshot: ActivatedRouteSnapshot, 
    private routeUtils: RouteUtilsService, 
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.itemId = this.routeSnapshot.params['itemId'];
    this.route
      .data
      .subscribe((data: { appUser: AppUser }) => {
          this.appUser = data.appUser[Object.keys(data.appUser)[0]];
          this.messages$ = <any>this.chatService.getMessages(this.itemId, this.appUser.userId);
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

  message(itemId: string, toId: string, message: string) {
      this.chatService.sendMessage(itemId, this.appUser.userId, toId, message).then((data: any) => {
          this.scroll(this.list.items.length);
      });
      this.textfield.text = '';
  }

  filter(sender) {
      if (sender == this.appUser.userId) {
          return "me"
      } else {
          return "them"
      }
  }

  align(sender) {
      if (sender == this.appUser.userId) {
          return "right"
      } else {
          return "left"
      }
  }
  showImage(sender) {
      if (sender == this.appUser.userId) {
          return "collapsed"
      } else {
          return "visible"
      }
  }

}
