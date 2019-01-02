import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable({
    providedIn: "root"
})
export class RouteUtilsService {

    constructor(private routerExtensions: RouterExtensions) {

    }

    public routeTo(url: string, transition?: string, fragment?: string): void {
        this.routerExtensions.navigate([url], {
            clearHistory: true,
            animated: true,
            transition: {
                name: transition,
                duration: 350,
                curve: "ease"
            },
            fragment: fragment
        });
    }

}