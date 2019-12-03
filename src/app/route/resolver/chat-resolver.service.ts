import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ChatService } from '~/app/shared/chat.service';
import { LoginService } from '~/app/shared/login.service';
import { Chat } from '~/app/shared/chat';

@Injectable({
    providedIn: "root"
})
export class ChatResolver implements Resolve<Promise<any>> {

    constructor(private loginService: LoginService, private chatService: ChatService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Chat> {
        console.log("resolving chat");
        return this.chatService.findById(route.params['itemId'], this.loginService.getCurrentId());
    }

}