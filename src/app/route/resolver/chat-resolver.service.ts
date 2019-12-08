import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ChatService } from '~/app/shared/chat.service';
import { LoginService } from '~/app/shared/login.service';
import { Chat } from '~/app/shared/chat';
import { AppUserService } from '~/app/shared/app-user.service';

@Injectable({
    providedIn: "root"
})
export class ChatResolver implements Resolve<Promise<any>> {

    constructor(private loginService: LoginService, private chatService: ChatService, 
        private appUserService: AppUserService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Chat> {
        console.log("resolving chat");

        let chatPromise: Promise<Chat>;
        if (route.params['chatId']) {
            chatPromise = this.chatService.findById(route.params['chatId']);
        } else {
            // branch for accessing a chat from lost-object view
            chatPromise = this.chatService.findByItemId(route.params['itemId'], this.loginService.getCurrentId())
        }
        
        return chatPromise.then(chat => {
            if (chat) {
                return this.appUserService.findById(
                    this.chatService.extractReceiverId(this.loginService.getCurrentId(), chat.users))
                    .then(receiver => {
                        chat.receiver = receiver;
                        return chat;
                    });
            }
            return chat;
        })
    }

}